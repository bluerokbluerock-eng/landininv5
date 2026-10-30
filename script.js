/* Configura el endpoint del CRM o servidor cuando esté disponible. */
const LANDING_CONFIG = Object.freeze({
  formEndpoint: "",
  countdownSeconds: 420,
});

(() => {
  "use strict";
  const form = document.querySelector("#lead-form");
  const status = document.querySelector("#form-status");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  // El original inicia siete minutos nuevos en cada carga de la página.
  const deadline = Date.now() + LANDING_CONFIG.countdownSeconds * 1000;
  function updateCountdown() {
    const seconds = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
    const parts = {
      horas: Math.floor(seconds / 3600),
      min: Math.floor((seconds % 3600) / 60),
      seg: seconds % 60,
    };
    document.querySelectorAll("[data-countdown-part]").forEach((element) => {
      element.textContent = String(
        parts[element.dataset.countdownPart],
      ).padStart(2, "0");
    });
    if (!seconds) clearInterval(countdownInterval);
  }
  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  document
    .querySelector('[data-action="go-to-form"]')
    .addEventListener("click", (event) => {
      event.preventDefault();
      document
        .querySelector("#formulario")
        .scrollIntoView({
          behavior: reduceMotion ? "instant" : "smooth",
          block: "start",
        });
      const target =
        document.querySelector("#lead-nombre") ||
        document.querySelector("#form-success");
      target?.focus({ preventScroll: true });
    });
  const today = new Date();
  form.elements.dob.max = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    status.hidden = false;
    status.className = "form-status";
    if (!LANDING_CONFIG.formEndpoint) {
      status.textContent =
        "El formulario aún no está conectado a un servicio de envío. Tus datos no se han enviado.";
      return;
    }
    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    status.textContent = "Enviando tus datos…";
    try {
      const response = await fetch(LANDING_CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error("No se pudo enviar");
      form.replaceWith(
        document.querySelector("#success-template").content.cloneNode(true),
      );
      document.querySelector("#form-success").focus({ preventScroll: true });
    } catch {
      status.textContent =
        "No se pudo enviar el formulario. Inténtalo de nuevo.";
    } finally {
      button.disabled = false;
    }
  });
})();

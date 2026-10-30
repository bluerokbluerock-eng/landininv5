LANDININV5 — HTML, CSS Y JAVASCRIPT PUROS

Uso
Abre index.html directamente o sirve esta carpeta como sitio estático.
No necesita React, Astro, Node ni compilación del frontend.
La fotografía original y las tipografías DM Serif Display e Inter son locales.

Subir a Railway
1. Conecta a Railway el repositorio que contiene esta carpeta.
2. Si el repositorio es landings, configura Root Directory como /landininv5
   y la ruta del archivo de configuración como /landininv5/railway.json.
   Si esta carpeta es la raíz del repositorio, usa los valores predeterminados.
3. Railway construye el Dockerfile. No agregues comandos de build o inicio.
   Nginx sirve los archivos en PORT (8080 si no hay uno asignado).
4. Genera el dominio del servicio en Networking.
Referencia: https://docs.railway.com/config-as-code/reference
Esta entrega prepara la carpeta, sin publicar en una cuenta de Railway.
No se ejecutó Docker en este equipo porque no está instalado.

Archivos
index.html       Estructura, contenido y plantilla de confirmación.
styles.css       Estilos estáticos y adaptación a pantallas.
script.js        Contador, enlace al formulario y envío configurable.
assets/          Fotografía, fuentes y licencias.
Dockerfile       Contenedor de Nginx.
nginx.conf       Configuración del servidor estático.
railway.json     Build y comprobación de disponibilidad en la ruta /.

Formulario
El original mostraba una confirmación visual, pero no enviaba datos a un servidor.
La conversión valida nombre, país, WhatsApp, correo y fecha de nacimiento.
Sin un destino configurado, informa que los datos no se han enviado.
Configura formEndpoint en LANDING_CONFIG, al principio de script.js, con un
endpoint POST que acepte JSON: name, country, phone, email y dob.
Solo se muestra la confirmación del diseño original cuando el endpoint responde
con un estado HTTP satisfactorio. No se guardan datos personales en el navegador.
Mantén las credenciales y claves privadas en el servidor.

Diseño y comportamiento
Se conservan la marca Alerta Empresario, composición, colores, testimonios,
textos, franja animada y datos del original. La referencia es la página generada
por src/App.tsx; el ZIP no contiene un .fig o captura independiente del lienzo.
El contador empieza en siete minutos con cada carga y se detiene en cero.
El botón principal lleva al formulario y enfoca el nombre.
Se respeta la preferencia de reducir movimiento.
Los PNG que no usa el componente no se incluyen. No se ejecutan los scripts
de publicación de Figma. Los textos y cifras proceden del material entregado;
no hay conexión a fuentes de datos o actividad en vivo.

Recursos
Fotografía original de Unsplash, photo-1611974789855-9c2a0a7236a3.
https://unsplash.com/license
DM Serif Display e Inter: Google Fonts, SIL Open Font License.
CSS compilado con Tailwind CSS, licencia MIT; no requiere Tailwind en ejecución.
Licencias redistribuidas en assets/licenses/.

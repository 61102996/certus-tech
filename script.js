// 1. Buscamos los elementos del HTML que vamos a utilizar.
const formulario = document.getElementById("formulario-publicacion");
const nombreInput = document.getElementById("nombre");
const categoriaInput = document.getElementById("categoria");
const mensajeInput = document.getElementById("mensaje");
const listaPublicaciones = document.getElementById("lista-publicaciones");
const contador = document.getElementById("contador");

// 2. Contamos las publicaciones que ya aparecen en la página.
function actualizarContador() {
  const cantidad = listaPublicaciones.querySelectorAll(".publicacion").length;
  contador.textContent = cantidad + (cantidad === 1 ? " publicación" : " publicaciones");
}

actualizarContador();

// 3. Escuchamos cuando el usuario envía el formulario.
formulario.addEventListener("submit", function (evento) {
  // Evita que el navegador recargue la página al enviar el formulario.
  evento.preventDefault();

  // 4. Leemos lo que escribió el usuario y quitamos espacios innecesarios.
  const nombre = nombreInput.value.trim();
  const categoria = categoriaInput.value;
  const mensaje = mensajeInput.value.trim();

  // Si falta el nombre o el mensaje, no publicamos nada.
  if (nombre === "" || mensaje === "") {
    alert("Escribe tu nombre y un mensaje antes de publicar.");
    return;
  }

  // 5. Creamos los elementos HTML de la nueva publicación.
  const publicacion = document.createElement("article");
  publicacion.className = "publicacion";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  // Usa las primeras letras del nombre para crear las iniciales.
  avatar.textContent = nombre
    .split(/\s+/)
    .slice(0, 2)
    .map(function (palabra) {
      return palabra.charAt(0).toUpperCase();
    })
    .join("");

  const cuerpo = document.createElement("div");
  cuerpo.className = "publicacion-cuerpo";

  const datos = document.createElement("div");
  datos.className = "datos-publicacion";

  const nombreElemento = document.createElement("strong");
  nombreElemento.textContent = nombre;

  const categoriaElemento = document.createElement("span");
  categoriaElemento.textContent = categoria;

  const mensajeElemento = document.createElement("p");
  mensajeElemento.textContent = mensaje;

  // 6. Unimos las piezas para formar una publicación completa.
  datos.append(nombreElemento, categoriaElemento);
  cuerpo.append(datos, mensajeElemento);
  publicacion.append(avatar, cuerpo);

  // 7. Mostramos la publicación nueva al inicio de la lista.
  listaPublicaciones.prepend(publicacion);

  // 8. Limpiamos los campos y actualizamos el número de publicaciones.
  formulario.reset();
  actualizarContador();
});

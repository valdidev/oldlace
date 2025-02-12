let puntos = document.querySelectorAll(".punto");
puntos.forEach(function (punto, index) {
  punto.onclick = function () {
    let carrusel1 = document.querySelector("#carrusel1");
    carrusel1.classList.remove("animado1");
    carrusel1.style.left = 0 - index * 1024 + "px";
  };
});

function cargaProductos() {
  fetch(ruta_back + "?tabla=productos")
    .then(function (response) {
      return response.json();
    })
    .then(function (datos) {
      console.log(datos);
      datos = datos.slice(0, 8);
      let contenedor = document.querySelector("#carrusel1");
      let contenedor2 = document.querySelector("#carrusel2");
      contenedor.innerHTML = "";
      datos.forEach(function (dato) {
        contenedor.innerHTML +=
          `
		 		<article style="background:url(` +
          ruta_static +
          `/photo/fondonegro.png),url(` +
          ruta_static +
          `/photo/maroon.png);background-size:cover;background-position:center center;">
					<h4>` +
          dato.titulo +
          `</h4>
					<p>` +
          dato.descripcion +
          `</p>
					<a href=""><button>Saber más</button></a>
				</article>
		 	`;
        contenedor2.innerHTML +=
          `
		 		<article style="background:url(` +
          ruta_static +
          `/photo/fondonegro.png),url(` +
          ruta_static +
          `/photo/maroon.png);background-size:cover;background-position:center center;">
					<h4>` +
          dato.titulo +
          `</h4>
					<p>` +
          dato.descripcion +
          `</p>
					<a href=""><button>Saber más</button></a>
				</article>
		 	`;
      });
    });
}
cargaProductos();

function pieDePagina() {
  fetch(ruta_back + "?tabla=redessociales")
    .then(function (response) {
      return response.json();
    })
    .then(function (datos) {
      console.log(datos);
      let contenedor = document.querySelector("#redes");
      datos.forEach(function (dato) {
        contenedor.innerHTML +=
          `
					<li>
						<a href="` +
          dato.enlace +
          `">
							<img src="` +
          dato.icono +
          `">` +
          dato.nombre +
          `
						</a>
					</li>
				`;
      });
    });
}
pieDePagina();

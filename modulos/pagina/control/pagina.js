function pagina() {
  const urlParams = new URLSearchParams(window.location.search);
  const idpagina = urlParams.get("pagina");
  fetch(ruta_back + "?busca=paginas&campo=Identificador&dato=" + idpagina)
    .then(function (response) {
      return response.json();
    })
    .then(function (datos) {
      console.log(datos);
      datos.forEach(function (dato) {
        document.querySelector("#titulopagina").textContent = dato.titulo;
        document.querySelector("#contenidopagina").innerHTML =
          dato.contenido.replace(/\n/g, "<br><br>");
      });
    });
}
pagina();

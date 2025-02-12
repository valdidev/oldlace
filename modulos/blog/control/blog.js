function cargaBlog() {
  fetch(ruta_back + "/?tabla=blog")
    .then(function (response) {
      return response.json();
    })
    .then(function (datos) {
      console.log(datos);
      let principal = document.querySelector("#contienearticulos");
      let plantilla = document.querySelector("#plantillaentrada");
      datos.forEach(function (dato) {
        let instancia = plantilla.content.cloneNode(true);
        instancia.querySelector("h4").textContent = dato.titulo;
        instancia.querySelector("time").textContent = dato.fecha;
        instancia
          .querySelector("article")
          .setAttribute("Identificador", dato.Identificador);
        instancia
          .querySelector("img")
          .setAttribute("src", "/static/photo/" + dato.imagen);
        instancia.querySelector("p").innerHTML =
          dato.contenido.substring(0, 250) + "...";
        instancia.querySelector("article").onclick = function () {
          fetch(
            "../back/?busca=blog&campo=Identificador&dato=" +
              this.getAttribute("Identificador")
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (datos) {
              let modal = document.querySelector("#modalpersonalizado");
              modal.innerHTML = "";

              let imagen = document.createElement("img");
              imagen.setAttribute("src", "../static/" + dato.imagen);
              modal.appendChild(imagen);

              let titulo = document.createElement("h3");
              titulo.textContent = dato.titulo;
              modal.appendChild(titulo);

              let fecha = document.createElement("time");
              fecha.textContent = dato.fecha;
              modal.appendChild(fecha);

              let contenido = document.createElement("p");
              contenido.innerHTML = dato.contenido;
              modal.appendChild(contenido);
            });
          document.querySelector("#contienemodalpersonalizado").style.display =
            "block";
          document.querySelector("#contienemodalpersonalizado").onclick =
            function (event) {
              event.stopPropagation();
              this.style.display = "none";
            };
          document.querySelector("#modalpersonalizado").onclick = function (
            event
          ) {
            event.stopPropagation();
          };
        };
        principal.appendChild(instancia);
      });
    });
}

cargaBlog();
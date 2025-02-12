function procesaCabecera() {
  fetch(ruta_back + "?tabla=categorias")
    .then(function (response) {
      return response.json();
    })
    .then(function (datos) {
      console.log(datos);
      let cabecera = document.querySelector("header nav ul");
      let plantilla = document.querySelector("#elementomenu");

      datos.forEach(function (dato) {
        let instancia = plantilla.content.cloneNode(true);
        let enlace = instancia.querySelector("a");

        enlace.textContent = dato.nombre;
        enlace.setAttribute("href", "categoria.php?cat=" + dato.Identificador);
        enlace.setAttribute("cat", dato.Identificador);
        instancia.querySelector("li").classList.add("categoria");

        enlace.addEventListener("mouseover", function () {
          console.log("Vamos a ver que hay en esta categoria");
          console.log(this.textContent);
          let tituloseccion = this.textContent;
          fetch(
            ruta_back +
              "?busca=productos&campo=categorias_nombre&dato=" +
              this.getAttribute("cat")
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (datos) {
              console.log(datos);
              document.querySelector("#categoria").textContent = tituloseccion;
              document.querySelector("#productos").innerHTML = "";
              datos.forEach(function (dato) {
                document.querySelector("#productos").innerHTML +=
                  "<li><a href='producto.php?prod=" +
                  dato.titulo +
                  "'>" +
                  dato.titulo +
                  "</a></li>";
              });
              let cabecera = document.querySelector("header");
              difumina(cabecera);
            });
        });
        cabecera.prepend(instancia);
      });
    })
    .catch(function (error) {
      console.warn("Error al cargar las categorías:", error);
      document.querySelector("#contienemodal").style.display = "block";
    });

  let cabecera = document.querySelector("header");
  let categorias = document.querySelectorAll(".categoria");

  cabecera.onmouseleave = function () {
    console.log("Has salido");
    document.querySelector("main").classList.remove("difuminado");
    document.querySelector("header").classList.remove("grande");
    cabecera.style.background = "rgba(255,255,255,1)";
  };
}

procesaCabecera();

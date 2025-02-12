fetch(ruta_back + "?tabla=oferta")
  .then(function (response) {
    return response.json();
  })
  .then(function (datos) {
    let texto = document.querySelector("#oferta p");
    texto.innerHTML = datos[0].texto + " - <a href=''>Saber más</a>";
  });

listadoProductos();

var actual = {};
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idproducto = urlParams.get("prod");
fetch(ruta_back + "?busca=productos&campo=titulo&dato=" + idproducto)
  .then(function (response) {
    return response.json();
  })
  .then(function (datos) {
    datos.forEach(function (dato) {
      document.querySelector("#nombreproducto").textContent = dato.titulo;
      document.querySelector("#descripcion").textContent = dato.descripcion;
      document.querySelector("#precio").textContent = dato.precio;
      actual = {
        nombre: dato.titulo,
        descripcion: dato.descripcion,
        precio: dato.precio,
      };
    });
  });
document.querySelector("#confirmar").onclick = function () {
  console.log("Confirmas que metes el producto en el carrito");
  const clavealmacenaje = "carrito";

  if (localStorage.getItem(clavealmacenaje) === null) {
    localStorage.setItem(clavealmacenaje, "[]");
  }

  let contenidoanterior = JSON.parse(localStorage.getItem(clavealmacenaje));
  console.log("Contenido anterior del carrito:", contenidoanterior);

  contenidoanterior.push(actual);

  localStorage.setItem(clavealmacenaje, JSON.stringify(contenidoanterior));
  console.log("Producto añadido al carrito:", actual);

  listadoProductos();
};
document.querySelector("#enviardatos").onclick = function () {
  let json = {};
  let nombre = document.querySelector("#nombrecliente").value;
  let apellidos = document.querySelector("#apellidoscliente").value;
  let email = document.querySelector("#emailcliente").value;
  let fecha = new Date();
  let fechahumana =
    fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
  let numeropedido =
    fecha.getFullYear() +
    "" +
    (fecha.getMonth() + 1) +
    "" +
    fecha.getDate() +
    "" +
    fecha.getHours() +
    "" +
    fecha.getMinutes() +
    "" +
    fecha.getSeconds();
  json = {
    cliente: {
      nombre: nombre,
      apellidos: apellidos,
      email: email,
    },
    pedido: {
      fecha: fechahumana,
      numerodepedido: numeropedido,
    },
    productos: JSON.parse(localStorage.getItem("carrito")),
  };
  fetch(ruta_back + "?envio=" + JSON.stringify(json))
    .then(function (response) {
      return response.text();
    })
    .then(function (datos) {
      console.log(datos);
      localStorage.removeItem("carrito");
      window.location = "index.php";
    });
};
function listadoProductos() {
  const clavealmacenaje = "carrito";
  let productos = localStorage.getItem(clavealmacenaje);
  let productosjson = JSON.parse(productos);
  let totalcarrito = 0;
  console.log(productosjson);
  let contenedor = document.querySelector("#carrito");
  contenedor.innerHTML = "";
  if (productosjson != undefined) {
    productosjson.forEach(function (producto) {
      contenedor.innerHTML +=
        `
			<article>
				<div class="texto">
					<h4>` +
        producto.nombre +
        `</h4>
					<p class="descripcion">` +
        producto.descripcion +
        `</p>
					<p class="precio">` +
        producto.precio +
        ` €</p>
				</div>
				<div class="eliminar" producto="` +
        producto.nombre +
        `">❌</div>
			</article>
		`;
      totalcarrito += parseFloat(producto.precio);
    });
    document.querySelector("#total").textContent =
      "El total de tu carrito es de: " + totalcarrito + " €";
  }
  setEliminarEventos();
}
document.querySelector("#procesarpedido").onclick = function () {
  document.querySelector("#datoscliente").style.display = "block";
};
function setEliminarEventos() {
  const elementosEliminar = document.querySelectorAll(".eliminar");
  elementosEliminar.forEach(function (elemento) {
    elemento.onclick = function () {
      const productoNombre = this.getAttribute("producto");
      eliminarProducto(productoNombre);
    };
  });
}

function eliminarProducto(nombreProducto) {
  const clavealmacenaje = "carrito";
  let productos = JSON.parse(localStorage.getItem(clavealmacenaje)) || [];
  const productosActualizados = productos.filter(
    (producto) => producto.nombre !== nombreProducto
  );
  localStorage.setItem(clavealmacenaje, JSON.stringify(productosActualizados));
  console.log("Producto eliminado:", nombreProducto);

  listadoProductos();
  setEliminarEventos();
}

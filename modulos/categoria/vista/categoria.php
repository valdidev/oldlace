<main>
	<?php
	include "modulos/bloque/vista/bloque.php";
	include "config.php";

	$peticion = "
		sELECT * 
		FROM bloquescategorias
		WHERE categorias_nombre = " . $_GET['cat'] . "
		;";
	$resultado = mysqli_query($conexion, $peticion);
	while ($fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {
		if ($fila['tipobloque_tipo'] == "1") {
			$bloque = new BloqueCompleto(
				$fila['titulo'],
				$fila['subtitulo']
			);
			echo $bloque->getBloque();
		} else if ($fila['tipobloque_tipo'] == "2") {
			$bloque = new BloqueCaja(
				$fila['titulo'],
				$fila['subtitulo']
			);
			echo $bloque->getBloque();
		} else if ($fila['tipobloque_tipo'] == "3") {
			$bloque = new BloqueMosaico(
				$fila['titulo'],
				$fila['subtitulo'],
				$fila['texto'],
				"",
				"",
				["uno", "dos", "tres", "cuatro"]
			);
			echo $bloque->getBloque();
		} else if ($fila['tipobloque_tipo'] == "4") {
			$bloque = new BloqueCajaYoutube(
				$fila['titulo'],
				$fila['subtitulo'],
				$fila['texto'],
				"",
				"",
				["uno", "dos", "tres", "cuatro"]
			);
			echo $bloque->getBloque("wip url");
		}
	}
	?>
</main>
<script>
	<?php include "./modulos/categoria/control/categoria.js"; ?>
</script>
<style>
	<?php
	include "categoria.css";
	?>
</style>
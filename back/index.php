<?php

include "inc/error.php";
include "Classes/ConexionBD.php";
include "../config.php";
header('Content-Type: application/json');

$conexion = new ConexionBD($servidor, $usuario, $contrasena, $db);

if (isset($_GET['tabla'])) {
	echo $conexion->pideAlgo($_GET['tabla']);
}
if (isset($_GET['busca'])) {
	echo $conexion->buscaAlgo(
		$_GET['busca'],
		$_GET['campo'],
		$_GET['dato']
	);
}
if (isset($_GET['envio'])) {
	$datos = json_decode($_GET['envio'], true);
	$archivo = '../basededatos/pedidos/' . date('U') . '.json';
	$datosbonitos = json_encode($datos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
	file_put_contents($archivo, $datosbonitos);
	echo "ok";
}
if (isset($_GET['producto'])) {
	echo file_get_contents("../basededatos/productos/" . $_GET['producto'] . ".json");
}
?>
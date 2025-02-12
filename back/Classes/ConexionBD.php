<?php

class ConexionBD
{
	private $conexion;

	public function __construct($servidor, $usuario, $contrasena, $db)
	{
		$this->conexion = mysqli_connect(
			$servidor,
			$usuario,
			$contrasena,
			$db
		);
	}

	function buscaAlgo($tabla, $columna, $dato)
	{
		$peticion = "
					SELECT * 
					FROM " . $tabla . "
					WHERE " . $columna . " = '" . $dato . "'
					;";
		$resultado = mysqli_query($this->conexion, $peticion);
		$json = [];
		while ($fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {
			foreach ($fila as $key => $value) {
				if (is_string($value) && strlen($value) > 300) {
					$fila[$key] = base64_encode($value);
				}
			}
			$json[] = $fila;
		}
		return json_encode($json);
	}

	function pideAlgo($tabla)
	{
		$peticion = "SELECT * FROM " . $tabla . ";";
		$resultado = mysqli_query($this->conexion, $peticion);
		$json = [];
		while ($fila = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {
			foreach ($fila as $key => $value) {
			}
			$json[] = $fila;
		}
		return json_encode($json);
	}
}
?>
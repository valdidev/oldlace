<?php
header("Content-Type: text/plain");

if (!isset($_POST['nombre']) || !isset($_POST['email']) || !isset($_POST['asunto']) || !isset($_POST['mensaje'])) {
    echo "Todos los campos son obligatorios.";
    exit;
}

$nombre = htmlspecialchars($_POST['nombre']);
$email = htmlspecialchars($_POST['email']);
$asunto = htmlspecialchars($_POST['asunto']);
$mensaje = htmlspecialchars($_POST['mensaje']);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "El correo electrónico no es válido.";
    exit;
}

$to = "destinatario@ejemplo.com";
$subject = "Nuevo mensaje de contacto: $asunto";
$body = "Nombre: $nombre\nEmail: $email\n\nMensaje:\n$mensaje";
$headers = "From: $email\r\nReply-To: $email\r\n";

$archivo = fopen("mail/" . date('U') . ".json", "w");
fwrite($archivo, json_encode($_POST, JSON_PRETTY_PRINT));
fclose($archivo);

if (mail($to, $subject, $body, $headers)) {
    echo "El correo se envió correctamente.";

    $data = [
        "nombre" => $nombre,
        "email" => $email,
        "asunto" => $asunto,
        "mensaje" => $mensaje,
        "fecha" => date("Y-m-d H:i:s"),
        "epoch" => time()
    ];
} else {
    echo "Hubo un problema al enviar el correo.";
}

?>
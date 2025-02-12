<?php
$mailFolder = __DIR__ . '/mail';

$fileName = isset($_GET['file']) ? $_GET['file'] : null;

if (!$fileName) {
    echo "Error: No file specified.";
    exit;
}

$filePath = realpath($mailFolder . '/' . $fileName);

if (!file_exists($filePath) || strpos($filePath, $mailFolder) !== 0) {
    echo "Error: File not found or access denied.";
    exit;
}

if (unlink($filePath)) {
    echo "File successfully deleted.";
} else {
    echo "Error: Unable to delete file.";
}

header("Location: panel.php");
exit;

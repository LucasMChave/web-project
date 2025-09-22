<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . '/../conexao.php');


$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

$sql = "DELETE FROM paciente WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["mensagem" => "Paciente deletado com sucesso."]);
} else {
    echo json_encode(["erro" => "Erro: " . $conn->error]);
}

$conn->close();
?>

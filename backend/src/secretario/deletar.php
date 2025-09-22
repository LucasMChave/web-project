<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . '/../conexao.php');

$dados = json_decode(file_get_contents("php://input"), true);

if (!isset($dados['id'])) {
    echo json_encode(["mensagem" => "ID do secretário não informado."]);
    exit;
}

$id = intval($dados['id']); 

$sql = "DELETE FROM secretario WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["mensagem" => "Secretário deletado com sucesso."]);
} else {
    echo json_encode(["mensagem" => "Erro ao deletar: " . $conn->error]);
}

$conn->close();
?>

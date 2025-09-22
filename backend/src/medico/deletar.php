<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . '/../conexao.php');

$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados || !isset($dados['id'])) {
    echo json_encode(["mensagem" => "ID não informado."]);
    exit;
}

$id = mysqli_real_escape_string($conn, $dados['id']);

$sql = "DELETE FROM medico WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["mensagem" => "Médico deletado com sucesso."]);
} else {
    echo json_encode(["mensagem" => "Erro ao deletar: " . $conn->error]);
}

$conn->close();
?>

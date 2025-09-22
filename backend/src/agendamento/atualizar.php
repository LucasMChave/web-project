<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . '/../conexao.php');

$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados || !isset($dados['id'])) {
    echo json_encode(["mensagem" => "Dados inválidos. ID obrigatório."]);
    exit;
}

$id = mysqli_real_escape_string($conn, $dados['id']);
$id_paciente = mysqli_real_escape_string($conn, $dados['id_paciente'] ?? '');
$id_medico = mysqli_real_escape_string($conn, $dados['id_medico'] ?? '');
$id_hospital = mysqli_real_escape_string($conn, $dados['id_hospital'] ?? '');
$data = mysqli_real_escape_string($conn, $dados['data'] ?? '');
$hora = mysqli_real_escape_string($conn, $dados['hora'] ?? '');
$observacoes = mysqli_real_escape_string($conn, $dados['observacoes'] ?? '');

$sql = "UPDATE agendamento SET 
    id_paciente='$id_paciente',
    id_medico='$id_medico',
    id_hospital='$id_hospital',
    data='$data',
    hora='$hora',
    observacoes='$observacoes'
    WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["mensagem" => "Agendamento atualizado com sucesso."]);
} else {
    echo json_encode(["mensagem" => "Erro ao atualizar: " . $conn->error]);
}

$conn->close();
?>

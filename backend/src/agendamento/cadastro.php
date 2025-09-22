<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . '/../conexao.php');

$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados) {
    echo json_encode(["mensagem" => "Dados não recebidos. Verifique o JSON enviado."]);
    exit;
}

$id_paciente = mysqli_real_escape_string($conn, $dados['id_paciente'] ?? '');
$id_medico = mysqli_real_escape_string($conn, $dados['id_medico'] ?? '');
$id_hospital = mysqli_real_escape_string($conn, $dados['id_hospital'] ?? '');
$data = mysqli_real_escape_string($conn, $dados['data'] ?? '');
$hora = mysqli_real_escape_string($conn, $dados['hora'] ?? '');
$observacoes = mysqli_real_escape_string($conn, $dados['observacoes'] ?? '');

$sql = "INSERT INTO agendamento 
    (id_paciente, id_medico, id_hospital, data, hora, observacoes) 
    VALUES 
    ('$id_paciente', '$id_medico', '$id_hospital', '$data', '$hora', '$observacoes')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["mensagem" => "Agendamento cadastrado com sucesso."]);
} else {
    echo json_encode(["mensagem" => "Erro ao cadastrar: " . $conn->error]);
}

$conn->close();
?>

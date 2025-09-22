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

$nome = mysqli_real_escape_string($conn, $dados['nome'] ?? '');
$email = mysqli_real_escape_string($conn, $dados['email'] ?? '');
$senha = mysqli_real_escape_string($conn, $dados['senha'] ?? '');
$telefone = mysqli_real_escape_string($conn, $dados['telefone'] ?? '');
$cpf = mysqli_real_escape_string($conn, $dados['cpf'] ?? '');
$sexo = mysqli_real_escape_string($conn, $dados['sexo'] ?? '');
$dataNascimento = mysqli_real_escape_string($conn, $dados['dataNascimento'] ?? '');
$endereco = mysqli_real_escape_string($conn, $dados['endereco'] ?? '');

$senha_hash = password_hash($senha, PASSWORD_DEFAULT);

$sql = "INSERT INTO secretario 
    (nome, email, senha, telefone, cpf, sexo, data_nascimento, endereco) 
    VALUES 
    ('$nome', '$email', '$senha_hash', '$telefone', '$cpf', '$sexo', '$dataNascimento', '$endereco')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["mensagem" => "Secretário cadastrado com sucesso."]);
} else {
    echo json_encode(["mensagem" => "Erro ao cadastrar: " . $conn->error]);
}

$conn->close();
?>

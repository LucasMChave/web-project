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
$cnpj = mysqli_real_escape_string($conn, $dados['cnpj'] ?? '');
$endereco = mysqli_real_escape_string($conn, $dados['endereco'] ?? '');

$senha_hash = password_hash($senha, PASSWORD_DEFAULT);

$sql = "INSERT INTO hospital 
    (nome, email, senha, telefone, cnpj, endereco) 
    VALUES 
    ('$nome', '$email', '$senha_hash', '$telefone', '$cnpj', '$endereco')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["mensagem" => "Hospital cadastrado com sucesso."]);
} else {
    echo json_encode(["mensagem" => "Erro ao cadastrar: " . $conn->error]);
}

$conn->close();
?>

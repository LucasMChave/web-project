<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . '/../conexao.php');

// Receber os dados em JSON
$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados) {
    echo json_encode(["mensagem" => "Dados não recebidos. Verifique o JSON enviado."]);
    exit;
}

// Escapar os dados
$nome = mysqli_real_escape_string($conn, $dados['nome'] ?? '');
$email = mysqli_real_escape_string($conn, $dados['email'] ?? '');
$senha = mysqli_real_escape_string($conn, $dados['senha'] ?? '');
$telefone = mysqli_real_escape_string($conn, $dados['telefone'] ?? '');
$cpf = mysqli_real_escape_string($conn, $dados['cpf'] ?? '');
$data_de_nascimento = mysqli_real_escape_string($conn, $dados['data_de_nascimento'] ?? '');
$sexo = mysqli_real_escape_string($conn, $dados['sexo'] ?? '');
$endereco = mysqli_real_escape_string($conn, $dados['endereco'] ?? '');
$possui_plano = mysqli_real_escape_string($conn, $dados['possui_plano'] ?? '');
$fornecedora_plano = mysqli_real_escape_string($conn, $dados['fornecedora_plano'] ?? '');

// Hash da senha (boa prática)
$senha_hash = password_hash($senha, PASSWORD_DEFAULT);

// Query SQL
$sql = "INSERT INTO paciente 
    (nome, email, senha, telefone, cpf, data_de_nascimento, sexo, endereco, possui_plano, fornecedora_plano) 
    VALUES 
    ('$nome', '$email', '$senha_hash', '$telefone', '$cpf', '$data_de_nascimento', '$sexo', '$endereco', '$possui_plano', '$fornecedora_plano')";

// Executar e responder
if ($conn->query($sql) === TRUE) {
    echo json_encode(["mensagem" => "Paciente cadastrado com sucesso."]);
} else {
    echo json_encode(["mensagem" => "Erro ao cadastrar: " . $conn->error]);
}

$conn->close();
?>

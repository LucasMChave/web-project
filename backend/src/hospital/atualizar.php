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
$nome = mysqli_real_escape_string($conn, $dados['nome'] ?? '');
$email = mysqli_real_escape_string($conn, $dados['email'] ?? '');
$telefone = mysqli_real_escape_string($conn, $dados['telefone'] ?? '');
$cnpj = mysqli_real_escape_string($conn, $dados['cnpj'] ?? '');
$endereco = mysqli_real_escape_string($conn, $dados['endereco'] ?? '');

$senha = $dados['senha'] ?? null;
$senha_sql = "";

if (!empty($senha)) {
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);
    $senha_sql = ", senha='$senha_hash'";
}

$sql = "UPDATE hospital SET 
    nome='$nome',
    email='$email',
    telefone='$telefone',
    cnpj='$cnpj',
    endereco='$endereco'
    $senha_sql
    WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["mensagem" => "Hospital atualizado com sucesso."]);
} else {
    echo json_encode(["mensagem" => "Erro ao atualizar: " . $conn->error]);
}

$conn->close();
?>

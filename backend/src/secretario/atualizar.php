<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . '/../conexao.php');

$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados || !isset($dados['id'])) {
    echo json_encode(["mensagem" => "Dados incompletos. Verifique se o 'id' foi enviado."]);
    exit;
}

$id = intval($dados['id']); 
$nome = mysqli_real_escape_string($conn, $dados['nome'] ?? '');
$email = mysqli_real_escape_string($conn, $dados['email'] ?? '');
$senha = mysqli_real_escape_string($conn, $dados['senha'] ?? '');
$telefone = mysqli_real_escape_string($conn, $dados['telefone'] ?? '');
$cpf = mysqli_real_escape_string($conn, $dados['cpf'] ?? '');
$sexo = mysqli_real_escape_string($conn, $dados['sexo'] ?? '');
$dataNascimento = mysqli_real_escape_string($conn, $dados['dataNascimento'] ?? '');
$endereco = mysqli_real_escape_string($conn, $dados['endereco'] ?? '');

$senhaSql = '';
if (!empty($senha)) {
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);
    $senhaSql = ", senha = '$senha_hash'";
}

$sql = "UPDATE secretario SET 
    nome = '$nome',
    email = '$email',
    telefone = '$telefone',
    cpf = '$cpf',
    sexo = '$sexo',
    data_nascimento = '$dataNascimento',
    endereco = '$endereco'
    $senhaSql
    WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["mensagem" => "Secretário atualizado com sucesso."]);
} else {
    echo json_encode(["mensagem" => "Erro ao atualizar: " . $conn->error]);
}

$conn->close();
?>

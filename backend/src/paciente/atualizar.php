<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . '/../conexao.php');


$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];

$email = $data['email'];
$senha = $data['senha'];
$telefone = $data['telefone'];
$cpf = $data['cpf'];
$nome = $data['nome'];
$data_nascimento = $data['data_de_nascimento'];
$sexo = $data['sexo'];

$sql = "UPDATE paciente SET 
email='$email', senha='$senha', telefone='$telefone', CPF='$cpf', 
nome='$nome', data_de_nascimento='$data_nascimento', sexo='$sexo' 
WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["mensagem" => "Paciente atualizado com sucesso."]);
} else {
    echo json_encode(["erro" => "Erro: " . $conn->error]);
}

$conn->close();
?>

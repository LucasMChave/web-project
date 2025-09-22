<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . '/../conexao.php');

$sql = "SELECT id, nome, email, telefone, cpf, sexo, data_nascimento, endereco FROM secretario";
$result = $conn->query($sql);

$secretarios = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $row['data_nascimento'] = date('d/m/Y', strtotime($row['data_nascimento']));
        $secretarios[] = $row;
    }
}

echo json_encode($secretarios);

$conn->close();
?>

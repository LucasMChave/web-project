<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . '/../conexao.php');

$sql = "SELECT * FROM medico";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $medicos = [];

    while ($row = $result->fetch_assoc()) {
        $medicos[] = $row;
    }

    echo json_encode($medicos);
} else {
    echo json_encode(["mensagem" => "Nenhum médico encontrado."]);
}

$conn->close();
?>

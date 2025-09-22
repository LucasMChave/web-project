<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . '/../conexao.php');

$sql = "SELECT * FROM agendamento";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $agendamentos = [];

    while ($row = $result->fetch_assoc()) {
        $agendamentos[] = $row;
    }

    echo json_encode($agendamentos);
} else {
    echo json_encode(["mensagem" => "Nenhum agendamento encontrado."]);
}

$conn->close();
?>

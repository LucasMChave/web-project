<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . '/../conexao.php');

$sql = "SELECT * FROM hospital";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $hospitais = [];

    while ($row = $result->fetch_assoc()) {
        $hospitais[] = $row;
    }

    echo json_encode($hospitais);
} else {
    echo json_encode(["mensagem" => "Nenhum hospital encontrado."]);
}

$conn->close();
?>

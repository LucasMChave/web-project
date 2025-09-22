<?php
include('conexao.php');

$sql = "SELECT * FROM paciente";
$result = $conn->query($sql);

$pacientes = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $pacientes[] = $row;
    }
}

echo json_encode($pacientes);

$conn->close();
?>

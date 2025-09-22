<?php
include('conexao.php');

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$senha = $data['senha'];

$sql = "SELECT * FROM paciente WHERE email='$email' AND senha='$senha'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc();
    echo json_encode(["mensagem" => "Login bem-sucedido!", "usuario" => $usuario]);
} else {
    echo json_encode(["erro" => "Email ou senha inválidos."]);
}

$conn->close();
?>

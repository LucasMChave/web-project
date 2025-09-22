<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include(__DIR__ . '/../conexao.php');

$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados) {
    echo json_encode(["mensagem" => "Dados não recebidos."]);
    exit;
}

$email = mysqli_real_escape_string($conn, $dados['email'] ?? '');
$senha = $dados['senha'] ?? '';

$sql = "SELECT * FROM medico WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    $usuario = $result->fetch_assoc();

    if (password_verify($senha, $usuario['senha'])) {
        unset($usuario['senha']); 
        echo json_encode([
            "mensagem" => "Login bem-sucedido.",
            "usuario" => $usuario
        ]);
    } else {
        echo json_encode(["mensagem" => "Senha incorreta."]);
    }
} else {
    echo json_encode(["mensagem" => "Usuário não encontrado."]);
}

$conn->close();
?>

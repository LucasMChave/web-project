<?php
// Exemplo de conexão com MySQL
$host = 'localhost80';
$db = 'med_org';
$user = 'root';
$pass = '848725';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
} catch (PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}

<?php


session_start();

$host = "localhost";
$dbname = "my_shop";
$username = "root";
$password = "root";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection error: " . $e->getMessage());
}


class User {
    private $pdo;
    
    public function __construct() {
        $this->pdo = getConnection();
    }
    
    public function getAllUsers() {
        $stmt = $this->pdo->prepare("SELECT * FROM users ORDER BY id DESC");
        $stmt->execute();
        return $stmt->fetchAll();
    }
    
    public function getUserById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
    
    public function createUser($name, $first_name, $username, $email, $password, $admin = null) {
        $stmt = $this->pdo->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
        $stmt->execute([$email, $username]);
        if ($stmt->fetch()) {
            throw new Exception("This email address or username is already in use");
        }
        
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        
        $stmt = $this->pdo->prepare("INSERT INTO users (name, first_name, username, email, password, admin) VALUES (?, ?, ?, ?, ?, ?)");
        return $stmt->execute([$name, $first_name, $username, $email, $hashedPassword, $admin]);
    }
    
    public function updateUser($id, $name, $first_name, $username, $email, $admin, $active = true) {
        $stmt = $this->pdo->prepare("SELECT id FROM users WHERE (email = ? OR username = ?) AND id != ?");
        $stmt->execute([$email, $username, $id]);
        if ($stmt->fetch()) {
            throw new Exception("This email address or username is already in use by another user");
        }
        
        $stmt = $this->pdo->prepare("UPDATE users SET name = ?, first_name = ?, username = ?, email = ?, admin = ? WHERE id = ?");
        return $stmt->execute([$name, $first_name, $username, $email, $admin, $id]);
    }
    
    public function updatePassword($id, $password) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
        return $stmt->execute([$hashedPassword, $id]);
    }
    
    public function deleteUser($id) {
        if ($this->isLastAdmin($id)) {
            throw new Exception("Unable to delete the last administrator");
        }
        
        $stmt = $this->pdo->prepare("DELETE FROM users WHERE id = ?");
        return $stmt->execute([$id]);
    }
    
    private function isLastAdmin($id) {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM users WHERE admin = 1 AND id != ?");
        $stmt->execute([$id]);
        return $stmt->fetchColumn() == 0;
    }
    
    public function getUserCount() {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) as count FROM users");
        $stmt->execute();
        return $stmt->fetch()['count'];
    }
}
?>

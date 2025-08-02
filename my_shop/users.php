<?php
// User.php
// Classe pour la gestion des utilisateurs

require_once 'config.php';

class User {
    private $pdo;
    
    public function __construct() {
        $this->pdo = getConnection();
    }
    
    // Méthode pour obtenir tous les utilisateurs
    public function getAllUsers() {
        $stmt = $this->pdo->prepare("SELECT * FROM users ORDER BY id DESC");
        $stmt->execute();
        return $stmt->fetchAll();
    }
    
    // Méthode pour obtenir un utilisateur par son ID
    public function getUserById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
    
    // Méthode pour créer un nouvel utilisateur
    public function createUser($name, $first_name, $username, $email, $password, $admin = null) {
        // Vérifier si l'email ou le username existe déjà
        $stmt = $this->pdo->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
        $stmt->execute([$email, $username]);
        if ($stmt->fetch()) {
            throw new Exception("Cet email ou nom d'utilisateur est déjà utilisé.");
        }
        
        // Hacher le mot de passe
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        
        $stmt = $this->pdo->prepare("INSERT INTO users (name, first_name, username, email, password, admin) VALUES (?, ?, ?, ?, ?, ?)");
        return $stmt->execute([$name, $first_name, $username, $email, $hashedPassword, $admin]);
    }
    
    // Méthode pour mettre à jour un utilisateur
    public function updateUser($id, $name, $first_name, $username, $email, $admin, $active = true) {
        // Vérifier si l'email ou le username existe déjà pour un autre utilisateur
        $stmt = $this->pdo->prepare("SELECT id FROM users WHERE (email = ? OR username = ?) AND id != ?");
        $stmt->execute([$email, $username, $id]);
        if ($stmt->fetch()) {
            throw new Exception("Cet email ou nom d'utilisateur est déjà utilisé par un autre utilisateur.");
        }
        
        $stmt = $this->pdo->prepare("UPDATE users SET name = ?, first_name = ?, username = ?, email = ?, admin = ? WHERE id = ?");
        return $stmt->execute([$name, $first_name, $username, $email, $admin, $id]);
    }
    
    // Méthode pour mettre à jour le mot de passe d'un utilisateur
    public function updatePassword($id, $password) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
        return $stmt->execute([$hashedPassword, $id]);
    }
    
    // Méthode pour supprimer un utilisateur
    public function deleteUser($id) {
        // Ne pas permettre la suppression du dernier administrateur
        if ($this->isLastAdmin($id)) {
            throw new Exception("Impossible de supprimer le dernier administrateur.");
        }
        
        $stmt = $this->pdo->prepare("DELETE FROM users WHERE id = ?");
        return $stmt->execute([$id]);
    }
    
    // Méthode pour vérifier si c'est le dernier administrateur
    private function isLastAdmin($id) {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM users WHERE admin = 1 AND id != ?");
        $stmt->execute([$id]);
        return $stmt->fetchColumn() == 0;
    }
    
    // Méthode pour obtenir le nombre total d'utilisateurs
    public function getUserCount() {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) as count FROM users");
        $stmt->execute();
        return $stmt->fetch()['count'];
    }
}
?>

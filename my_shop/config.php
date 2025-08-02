<?php
// config.php
// Fichier de configuration de la base de données

// Paramètres de connexion à la base de données
$servername = "localhost";
$username_db = "root";
$password_db = "root";
$dbname = "my_shop";

// Fonction de connexion à la base de données
function getConnection() {
    global $servername, $username_db, $password_db, $dbname;
    try {
        $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username_db, $password_db);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("Connection error: " . $e->getMessage());
    }
}

// Démarrer la session
session_start();

// Fonction pour vérifier si l'utilisateur est connecté
function isLoggedIn() {
    return isset($_SESSION['user_id']) && isset($_SESSION['username']);
}

// Fonction pour vérifier si l'utilisateur est administrateur
function isAdmin() {
    return isLoggedIn() && isset($_SESSION['is_admin']) && $_SESSION['is_admin'] == 1;
}

// Fonction pour rediriger vers la page de login si non connecté
function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: signin.php');
        exit();
    }
}

// Fonction pour rediriger vers la page d'administration si non administrateur
function requireAdmin() {
    if (!isAdmin()) {
        header('Location: index1.php');
        exit();
    }
}

// Fonction pour afficher un message d'alerte
function showAlert($message, $type = 'success') {
    if (!isset($_SESSION['alerts'])) {
        $_SESSION['alerts'] = [];
    }
    $_SESSION['alerts'][] = ['message' => $message, 'type' => $type];
}

// Fonction pour obtenir et afficher les messages d'alerte
function displayAlerts() {
    if (isset($_SESSION['alerts']) && !empty($_SESSION['alerts'])) {
        foreach ($_SESSION['alerts'] as $alert) {
            echo '<div class="p-4 mb-4 text-sm rounded-lg bg-' . 
                 ($alert['type'] === 'success' ? 'green' : $alert['type'] === 'danger' ? 'red' : 'blue') . 
                 '-100 text-' . 
                 ($alert['type'] === 'success' ? 'green' : $alert['type'] === 'danger' ? 'red' : 'blue') . 
                 '-700">' .
                 '<span class="font-medium">' . 
                 ($alert['type'] === 'success' ? 'Succès!' : $alert['type'] === 'danger' ? 'Erreur!' : 'Info!') . 
                 '</span> ' . $alert['message'] . 
                 '</div>';
        }
        // Nettoyer les alertes après affichage
        unset($_SESSION['alerts']);
    }
}
?>

<?php
// Page principale d'administration

require_once 'config.php';
require_once 'User.php';

// Vérifier les droits d'accès
if (!isLoggedIn() || !isAdmin()) {
    header('Location: signin.php');
    exit();
}

// Créer l'instance du gestionnaire d'utilisateurs
$userManager = new User();

// Obtenir les données pour le tableau de bord
$users = $userManager->getAllUsers();
$userCount = $userManager->getUserCount();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administration - Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        /* Variables CSS pour les couleurs primaires */
        :root {
            --primary: 240 100% 45%;
            --primary-50: 240 100% 98%;
            --primary-100: 240 100% 95%;
            --primary-200: 240 100% 89%;
            --primary-300: 240 100% 78%;
            --primary-400: 240 100% 62%;
            --primary-500: 240 100% 45%;
            --primary-600: 240 100% 38%;
            --primary-700: 240 100% 31%;
            --primary-800: 240 100% 24%;
            --primary-900: 240 100% 17%;
        }
        
        /* Classes personnalisées pour la couleur primaire */
        .bg-primary {
            background-color: hsl(var(--primary));
        }
        
        .hover-bg-primary:hover {
            background-color: hsl(var(--primary-600));
        }
        
        .text-primary {
            color: hsl(var(--primary));
        }
        
        .border-primary {
            border-color: hsl(var(--primary));
        }
        
        /* Dégradés personnalisés */
        .from-primary {
            background-image: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(280, 100%, 45%) 100%);
        }
        
        .to-primary {
            background-image: linear-gradient(135deg, hsl(200, 100%, 45%) 0%, hsl(var(--primary)) 100%);
        }
        
        /* Style des cartes avec ombres et transitions */
        .card {
            border-radius: 16px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            transition: transform 0.3s ease;
        }
        
        /* Animation au survol des cartes */
        .card:hover {
            transform: translateY(-5px);
        }
        
        /* Style des boutons */
        .btn {
            border-radius: 50px;
            padding: 0.5rem 1.25rem;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        /* Bouton primaire avec dégradé */
        .btn-primary {
            background-image: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(280, 100%, 45%) 100%);
            color: white;
            border: none;
        }
        
        /* Animation au survol du bouton primaire */
        .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 25px -5px hsla(var(--primary), 0.3);
        }
        
        /* Style des boutons outline */
        .btn-outline {
            border-width: 2px;
            background-color: transparent;
        }
        
        .btn-outline-primary {
            border-color: hsl(var(--primary));
            color: hsl(var(--primary));
        }
        
        .btn-outline-primary:hover {
            background-color: hsl(var(--primary-100));
        }
        
        /* Badges pour les statuts */
        .badge {
            padding: 0.25rem 0.75rem;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .badge-active {
            background-color: hsl(145, 50%, 90%);
            color: hsl(145, 40%, 30%);
        }
        
        .badge-inactive {
            background-color: hsl(0, 50%, 90%);
            color: hsl(0, 40%, 30%);
        }
        
        .badge-admin {
            background-color: hsl(200, 50%, 90%);
            color: hsl(200, 40%, 30%);
        }
        
        /* Sidebar avec dégradé */
        .sidebar {
            min-height: 100vh;
            background-image: linear-gradient(135deg, hsl(200, 100%, 45%) 0%, hsl(180, 100%, 45%) 100%);
        }
        
        /* Style des éléments du menu */
        .sidebar-item {
            color: white;
            margin: 0.5rem 1rem;
            border-radius: 12px;
            padding: 0.75rem 1rem;
            transition: all 0.3s ease;
        }
        
        .sidebar-item:hover, .sidebar-item.active {
            background-color: rgba(255, 255, 255, 0.2);
        }
        
        .sidebar-item i {
            margin-right: 0.75rem;
        }
        
        /* Style des tableaux */
        .table th {
            background-color: hsl(220, 10%, 95%);
            font-weight: 600;
            color: hsl(220, 10%, 20%);
        }
        
        /* Images d'utilisateurs */
        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        /* En-tête du tableau de bord */
        .dashboard-header {
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
            margin-bottom: 1.5rem;
        }
        
        /* Titres de section */
        .section-title {
            border-bottom: 2px solid hsl(220, 10%, 90%);
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
            color: hsl(220, 10%, 20%);
        }
    </style>
</head>
<body class="bg-gray-700 dark:bg-gray-900">
    <!-- Navigation principale -->
    <nav class="bg-primary text-white p-4 shadow-lg">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo et titre -->
            <div class="flex items-center space-x-2">
                <i class="fas fa-cogs text-2xl"></i>
                <span class="text-xl font-bold">Administration</span>
            </div>
            
            <!-- Informations utilisateur et bouton de déconnexion -->
            <div class="flex items-center space-x-4">
                <span class="flex items-center space-x-2">
                    <i class="fas fa-user-shield"></i>
                    <span><?= htmlspecialchars($_SESSION['username']) ?></span>
                </span>
                <a href="logout.php" class="btn btn-outline text-white border-white hover:bg-white hover:text-primary transition-all">
                    <i class="fas fa-sign-out-alt mr-2"></i> Déconnexion
                </a>
            </div>
        </div>
    </nav>

    <!-- Conteneur principal -->
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row">
            <!-- Sidebar de navigation -->
            <div class="md:w-64 w-full md:mr-6 mb-6 md:mb-0">
                <div class="sidebar p-6 rounded-xl text-white">
                    <!-- Informations administrateur -->
                    <div class="text-center mb-8">
                        <img src="https://placehold.co/80x80/667eea/ffffff?text=<?= substr($_SESSION['username'], 0, 1) ?>" alt="Admin" class="rounded-full mb-3 mx-auto">
                        <h6 class="font-semibold"><?= htmlspecialchars($_SESSION['username']) ?></h6>
                        <p class="text-sm opacity-80"><?= htmlspecialchars($_SESSION['email']) ?></p>
                    </div>
                    
                    <!-- Menu de navigation -->
                    <ul class="space-y-2">
                        <li>
                            <a href="admin1.php" class="sidebar-item active flex items-center">
                                <i class="fas fa-th-large"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="users.php" class="sidebar-item flex items-center">
                                <i class="fas fa-users"></i>
                                <span>Utilisateurs</span>
                            </a>
                        </li>
                        <li>
                            <a href="index1.php" class="sidebar-item flex items-center">
                                <i class="fas fa-store"></i>
                                <span>Site web</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Contenu principal -->
            <div class="flex-1">
                <!-- En-tête du tableau de bord -->
                <div class="dashboard-header bg-white">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-800">Bienvenue, <?= htmlspecialchars($_SESSION['username']) ?></h2>
                            <p class="text-gray-600">Tableau de bord de gestion du site</p>
                        </div>
                        <div class="text-right mt-4 md:mt-0">
                            <p class="text-sm text-gray-500">Dernière connexion:</p>
                            <p class="font-medium"><?= date('d/m/Y à H:i') ?></p>
                        </div>
                    </div>
                </div>

                <!-- Messages d'alerte -->
                <?php displayAlerts(); ?>

                <!-- Cartes de statistiques -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <!-- Carte Utilisateurs -->
                    <div class="card bg-primary text-white p-6 text-center rounded-xl">
                        <div class="text-3xl mb-3">
                            <i class="fas fa-users"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-1"><?= $userCount ?></h3>
                        <p class="opacity-90">Utilisateurs</p>
                    </div>
                    
                    <!-- Carte Administrateurs -->
                    <div class="card bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 text-center rounded-xl">
                        <div class="text-3xl mb-3">
                            <i class="fas fa-user-shield"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-1">
                            <?php 
                            $adminCount = 0;
                            foreach ($users as $user) {
                                if ($user['admin'] == 1) {
                                    $adminCount++;
                                }
                            }
                            echo $adminCount;
                            ?>
                        </h3>
                        <p class="opacity-90">Administrateurs</p>
                    </div>
                    
                    <!-- Carte Utilisateurs normaux -->
                    <div class="card bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 text-center rounded-xl">
                        <div class="text-3xl mb-3">
                            <i class="fas fa-user"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-1"><?= $userCount - $adminCount ?></h3>
                        <p class="opacity-90">Utilisateurs normaux</p>
                    </div>
                </div>

                <!-- Section Gestion des utilisateurs -->
                <section id="users-section" class="mb-10">
                    <!-- En-tête de section -->
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h4 class="section-title flex items-center text-xl font-bold text-gray-800">
                            <i class="fas fa-users mr-3 text-primary"></i> Tous les utilisateurs
                        </h4>
                    </div>

                    <!-- Tableau des utilisateurs -->
                    <div class="card bg-white rounded-xl overflow-hidden shadow-lg">
                        <div class="p-6">
                            <div class="overflow-x-auto">
                                <table class="w-full text-sm text-left text-gray-500">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 rounded-tl-lg">Utilisateur</th>
                                            <th scope="col" class="px-6 py-3">Nom complet</th>
                                            <th scope="col" class="px-6 py-3">Email</th>
                                            <th scope="col" class="px-6 py-3">Rôle</th>
                                            <th scope="col" class="px-6 py-3 rounded-tr-lg">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($users as $user): ?>
                                        <tr class="bg-white border-b hover:bg-gray-50">
                                            <td class="px-6 py-4">
                                                <div class="flex items-center">
                                                    <img src="https://placehold.co/40x40/667eea/ffffff?text=<?= substr($user['username'], 0, 1) ?>" alt="<?= htmlspecialchars($user['username']) ?>" class="user-avatar mr-3">
                                                    <div>
                                                        <div class="font-medium text-gray-900"><?= htmlspecialchars($user['username']) ?></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4"><?= htmlspecialchars($user['name']) ?> <?= htmlspecialchars($user['first_name']) ?></td>
                                            <td class="px-6 py-4"><?= htmlspecialchars($user['email']) ?></td>
                                            <td class="px-6 py-4">
                                                <span class="badge <?= $user['admin'] == 1 ? 'badge-admin' : '' ?> flex items-center">
                                                    <i class="fas fa-<?= $user['admin'] == 1 ? 'user-shield' : 'user' ?> mr-1"></i> 
                                                    <?= $user['admin'] == 1 ? 'Administrateur' : 'Utilisateur' ?>
                                                </span>
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="flex space-x-2">
                                                    <a href="users.php?action=edit&id=<?= $user['id'] ?>" class="btn btn-outline btn-outline-primary text-xs p-2">
                                                        <i class="fas fa-edit"></i>
                                                    </a>
                                                    <?php if ($user['id'] != $_SESSION['user_id']): ?>
                                                    <a href="users.php?action=delete&id=<?= $user['id'] ?>" class="btn btn-outline btn-outline-danger text-xs p-2">
                                                        <i class="fas fa-trash"></i>
                                                    </a>
                                                    <?php endif; ?>
                                                </div>
                                            </td>
                                        </tr>
                                        <?php endforeach; ?>
                                        
                                        <?php if (empty($users)): ?>
                                        <tr>
                                            <td colspan="5" class="text-center py-4 text-gray-500">
                                                Aucun utilisateur trouvé dans la base de données.
                                            </td>
                                        </tr>
                                        <?php endif; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</body>
</html>

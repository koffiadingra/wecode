<?php


$error = "";
// on verifie si le formulaire est a ete envoyé
if (!empty($_POST)) {
    
    if (isset($_POST["name"], $_POST["first_name"], $_POST["username"], $_POST["email"], $_POST["password"], $_POST["password_confirmation"])
        && !empty($_POST["name"]) && !empty($_POST["first_name"]) && !empty($_POST["username"]) && !empty($_POST["email"]) && !empty($_POST["password"]) && !empty($_POST["password_confirmation"]) ) {
            //le formulaire est complet


            // verifie que l'email est correct 
            if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
                $error = "Email invalide.";
            }
            // gere  le mot de passe
            if ($_POST["password"] !== $_POST["password_confirmation"]) {
                $error = "Les mots de passe ne correspondent pas.";
            } elseif (strlen($_POST["password"]) < 4 ) {
                $error = "Le mot de passe doit contenir au moins 4 caractères.";
            } else {
                $pass = password_hash($_POST["password"], PASSWORD_ARGON2ID);
            }

            // autre verification 

            if (strlen($_POST["username"]) < 3) {
                $error = "Le nom d'utilisateur doit contenir au moins 3 caractères.";
            }
        

        // enregistre dans la basse de donne
        require_once "connect_db.php";

        $sql = "INSERT INTO `users`(`username`, `password`, `email`, `name`, `first_name`) VALUES(:pseudo, '$pass', :email, :names, :first_name)";
        $query = $conn->prepare($sql);
        $query->bindValue(":pseudo", $_POST["username"], PDO::PARAM_STR);
        $query->bindValue(":email", $_POST["email"], PDO::PARAM_STR);
        $query->bindValue(":names", $_POST["name"], PDO::PARAM_STR);
        $query->bindValue(":first_name", $_POST["first_name"], PDO::PARAM_STR);

        $query->execute();


    } else {
        $error = "Tous les champs sont obligatoires.";
    }
}


?>

<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Inscription</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white min-h-screen flex items-center justify-center">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-3xl mb-6 font-bold text-red-600 text-center">Créer un compte</h1>
        <?php if ($error): ?>
            <div class="bg-red-700 text-white p-3 mb-4 rounded"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <form method="post" action="" class="space-y-4">
            <div>
                <label for="name" class="block mb-1">Nom</label>
                <input type="text" name="name" id="name" required class="w-full p-2 rounded bg-gray-700 text-white" />
            </div>
            <div>
                <label for="first_name" class="block mb-1">Prénom</label>
                <input type="text" name="first_name" id="first_name" required class="w-full p-2 rounded bg-gray-700 text-white" />
            </div>
            <div>
                <label for="username" class="block mb-1">Nom d'utilisateur</label>
                <input type="text" name="username" id="username" required class="w-full p-2 rounded bg-gray-700 text-white" />
            </div>
            <div>
                <label for="email" class="block mb-1">Email</label>
                <input type="email" name="email" id="email" required class="w-full p-2 rounded bg-gray-700 text-white" />
            </div>
            <div>
                <label for="password" class="block mb-1">Mot de passe (Au moins 4 caracteres )</label>
                <input type="password" name="password" id="password" required class="w-full p-2 rounded bg-gray-700 text-white" />
            </div>
            <div>
                <label for="password_confirmation" class="block mb-1">Confirmer le mot de passe</label>
                <input type="password" name="password_confirmation" id="password_confirmation" required class="w-full p-2 rounded bg-gray-700 text-white" />
            </div>
            <button type="submit" class="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-semibold">S'inscrire</button>
        </form>
        <p class="mt-4 text-center text-gray-400">
            Déjà un compte ? <a href="signin.php" class="text-red-500 hover:underline">Se connecter</a>
        </p>
    </div>
</body>
</html>

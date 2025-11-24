<?php


$error = "";
if (!empty($_POST)){

    if (isset($_POST["email"], $_POST["password"]) && !empty($_POST["email"]) && !empty($_POST["password"]) ) 
    {
        
        if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
                $error = "Email invalide.";
            }

        // verification de l'utilisateur
        require_once "connect_db.php";
        $sql = "SELECT * FROM `users` WHERE `email` = :email";
        $query = $conn->prepare($sql);

        $query->bindValue(":email", $_POST["email"], PDO::PARAM_STR);
        
        $query->execute();

        $user = $query->fetch();
        if (!user) {
                $error = "utilisateur et/ou le mot de passe n'existe pas";
        }

        // verification du mot de passe 

        if (!password_verify($_POST["password"], $user["password"])) {
                $error = "utilisateur et/ou le mot de passe n'existe pas";
        }
        // debut de la session
        session_start();
        $_SESSION["user"] = [
            "id" => $user["id"],
            "pseudo" => $user["username"],
            "email" => $user["email"],
        ];

        header("location: profil.php");

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
<title>Connexion</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white min-h-screen flex items-center justify-center">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-3xl mb-6 font-bold text-red-600 text-center">Se connecter</h1>
        <?php if ($error): ?>
            <div class="bg-red-700 text-white p-3 mb-4 rounded"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <form method="post" action="" class="space-y-4">
            <div>
                <label for="identifier" class="block mb-1">Nom d'utilisateur ou Email</label>
                <input type="text" name="identifier" id="identifier" required class="w-full p-2 rounded bg-gray-700 text-white" />
            </div>
            <div>
                <label for="password" class="block mb-1">Mot de passe</label>
                <input type="password" name="password" id="password" required class="w-full p-2 rounded bg-gray-700 text-white" />
            </div>
            <button type="submit" class="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-semibold">Se connecter</button>
        </form>
        <p class="mt-4 text-center text-gray-400">
            Pas encore de compte ? <a href="signup.php" class="text-red-500 hover:underline">S'inscrire</a>
        </p>
    </div>
</body>
</html>

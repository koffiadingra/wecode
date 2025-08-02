<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "my_shop";

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection error: " . $e->getMessage());
}
$nom = $prenom = $username = $email = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['valider'])) {
    $nom = trim($_POST['name']);
    $prenom = trim($_POST['first_name']);
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $password_confirmation = $_POST['password_confirmation'];
        
    $error = "";
    if (empty($nom) || empty($prenom) || empty($username) || empty($email) || empty($password)) {
        $error = "All fields are mandatory";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email";
    } elseif ($password !== $password_confirmation) {
        $error = "Passwords don't match";
    } elseif (strlen($password) < 4 || strlen($password) > 10) {
        $error = "The password must be between 4 and 10 characters long";
    } elseif (strlen($username) < 3 ) {
        $error = "Username must be at least 3 characters long";
    } else {
        $bdd = $pdo->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
        $bdd->execute([$email, $username]);
        if ($bdd->fetch()) {
            $error = "This email or username is already in use";
        } else {
            $salt = uniqid();
            $hashPassword = password_hash($password, PASSWORD_BCRYPT);

            $bdd = $pdo->prepare("INSERT INTO users (username, email, password, name, first_name) VALUES (?, ?, ?, ?, ?)");
            $bdd->execute([$username, $email, $hashPassword, $nom, $prenom]);

            header("Location: signin.php");
            exit();
        }
    }
}
?>

<div class="inscript">
    <section class="bg-gray-700 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center  text-2xl font-semibold text-gray-900 dark:text-white">
                my_shop online
            </a>
            <div class="w-full bg-gray-500 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>

                    <?php if ($error): ?>
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <?= htmlspecialchars($error) ?>
                        </div>
                    <?php endif; ?>

                    <form class="space-y-4 md:space-y-6" method="POST" action="">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
                            <input type="text" name="name" id="name" value="<?= htmlspecialchars($nom) ?>" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                        </div>
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">first name</label>
                            <input type="text" name="first_name" id="first_name" value="<?= htmlspecialchars($prenom) ?>" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                        </div>
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                            <input type="text" name="username" id="username" value="<?= htmlspecialchars($username) ?>" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" value="<?= htmlspecialchars($email) ?>" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password (4 to 10 characters)</label>
                            <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                        </div>
                        <div>
                            <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input type="password" name="password_confirmation" id="password_confirmation" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                        </div>
                        <button type="submit" name="valider" value="valider inscription" class="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> Sign up </button>
                        <p class="text-sm font-light text-withe dark:text-withe">
                            Already have an account? 
                            <a href="signin.php" class="font-medium text-primary-600 hover:underline dark:text-primary-500"> Login </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
</body>
</html>

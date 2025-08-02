<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<?php
session_start();

$host = "localhost";
$dbname = "my_shop";
$username_db = "root";
$password_db = "root";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username_db, $password_db);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection error: " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = trim($_POST["identifier"]);
    $password = $_POST["password"];

$error = "";
    if (empty($input) || empty($password)) {
        $error = "Please fill in all fields.";
    } else {
        
        $bdd = $pdo->prepare("SELECT * FROM users WHERE username = ? OR email = ? ");
        $bdd->execute([$input, $input]);
        $user = $bdd->fetch();

        if ($user && $user["admin"] == 1 && password_verify($password, $user['password'])) {
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["username"] = $user["username"];
            $_SESSION["email"] = $user["email"];

            header("Location: admin1.php");
            exit();
            } else {
                $error = "Incorrect username, email or password.";
            }

        if ($user && $user["admin"] == null && password_verify($password, $user['password'])) {
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["username"] = $user["username"];
            $_SESSION["email"] = $user["email"];

            header("Location: index1.php");
            exit();
        } else {
            $error = "Incorrect username, email or password.";
        }
    }
}


?>

<div class="login">
    <section class="bg-gray-700 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"> my_shop online </a>
            <div class="w-full bg-gray-500 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">

                    <?php if ($error): ?>
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"><?= htmlspecialchars($error) ?> </div>
                    <?php endif; ?>

                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"> Sign in to your account </h1>

                    <form class="space-y-4 md:space-y-6" method="POST" action="">
                        <div>
                            <label for="identifier" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Username or Email </label>
                            <input  type="text" name="identifier" id="identifier" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Password </label>
                            <input type="password"  name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                        </div>
                        <button type="submit" class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        
                        <p class="text-sm font-light text-white dark:text-white"> Don't have an account yet? <a href="signup.php" class="font-medium text-primary-600 hover:underline dark:text-primary-500"> Sign up</a></p>
                        <div>
                            <p class="text-xs text-gray-400 text-center"> Need help? Contact customer service at 07 67 07 91 02 </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
</body>
</html>

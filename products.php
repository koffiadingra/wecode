<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "my_shop";

try {
    $con = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT id, name, description, price, image FROM products";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $produits = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch(PDOException $e) {
    echo "connection error : " . $e->getMessage();
}


if ($produits) {
    foreach ($produits as $produit) {
        echo "<div>";
        echo "<h3>" . htmlspecialchars($produit["name"]) . "</h3>";
        echo "<p>" . htmlspecialchars($produit["description"]) . "</p>";
        echo "<p>Prix : " . number_format($produit["price"], 2, ',', ' ') . " $</p>";
        
        if ($produit["image_data"]) {
            echo "<img src='images/" . htmlspecialchars($produit["image_data"]) . "' alt='" . htmlspecialchars($produit["name"]) . "' width='100'>";
        }
        echo "</div>";
    }
} else {
    echo "No products found";
}


$con = null;
header("location : admin1.php?action=products")
?>
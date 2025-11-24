<?php
const ERROR_LOG_FILE="errors.log";
$host='localhost';
$username="root";
$passwd="mid0225";
$port=3306; 
$db="my_shop";

    try {
        $conn= new PDO("mysql:host=$host;dbname=$db;port=$port", $username, $passwd);
        return $conn;
    } catch (PDOException $th) {
        echo $error= "PDO ERROR: ". $th->getMessage() ." storage in ". ERROR_LOG_FILE." \n";
        file_put_contents(ERROR_LOG_FILE, $error,FILE_APPEND);
    }
?>

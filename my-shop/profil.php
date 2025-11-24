<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Akatsuki</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <div class="header">
            <div class= "navbar">
        <div class= "logo">
          <a href="#"><em>Akatsuki dev</em></a>
        </div>

        <div class= "search-bar">
            <img src="image/magnifying-glass-solid-full.svg" alt="search logo">
            <input type="text" name= "Search" placeholder= "Search">
        </div>

        <ul class= links>
      
            <li><a href=""><img src="image/person-circle.svg" alt=""></a></li>
            <li><a href="deconnexion.php"><img src="image/power.svg" alt=""></a></li>
             
        </ul>
            
        <div class="cart">
            <a href="#"><img src="image/cart-fill.svg" alt="cart"></a>
        </div> 

        <div class= "burger-menu">
        <a href="#"><img src="image/bars-solid-full.svg" alt=""></a>
        </div>   
    </div>
        
      </div>
      <div class="sidebar">
        <ul>
          <li><a href="">Fruit & Legume</a></li>
          <li><a href="">Maison & bureau</a></li>
          <li><a href=""> Téléphone</a></li>
          <li><a href="">Mode</a></li>
          <li><a href="">Beauté & Hygiène</a></li>
          <li><a href="">Informatique</a></li>
          <li><a href="">Jeux video</a></li>
          <li><a href="">Article de sport</a></li>
        </ul>
      </div>
          <div class="promo">
        
        </div>
      <div class="nav">
        <div>
          <a href="http://">MOST VIEWED</a>
          <img class="imag" src="image/mostviwe.jpg" alt="" />

        </div>
        <div>
          <a href="http://">BEST SELLER </a>
          <img class="imag" src="image/pull.jpg" alt="" />

        </div>
      </div>
      <div class="main">
        <div class="card">
          <p class="title">Article Title</p>

          <img class="imag" src="image/arm.jpg" alt="" />
        </div>
        <div class="card">
          <p class="title">Article Title</p>
          <img class="imag" src="image/phone.jpeg" alt="" />
        </div>
        <div class="card">
          <p class="title">Article Title</p>
          <img class="imag" src="image/imprim.jpg" alt="" />
        </div>
        <div class="card">
          <p class="title">Article Title</p>
          <img class="imag" src="image/pc.jpeg" alt="" />
        </div>
        <div class="card">
          <p class="title">Article Title</p>
          <img class="imag" src="image/electromenager.jpg" alt="" />
        </div>
        <div class="card">
          <p class="title">Article Title</p>
          <img class="imag" src="image/bureautique.jpeg" alt="" />
        </div>
        <div class="card">
          <p class="title">Article Title</p>
          <img class="imag" src="image/ps5.jpeg" alt="" />
        </div>
        <div class="card">
          <p class="title">Article Title</p>
          <img class="imag" src="image/fruit.jpeg" alt="" />
        </div>
      </div>
      <div class="footer">bonjour</div>
    </div>
  </body>
</html>

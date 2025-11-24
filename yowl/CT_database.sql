-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: CT_database
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  `post_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_user_id_foreign` (`user_id`),
  KEY `comments_post_id_foreign` (`post_id`),
  CONSTRAINT `comments_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `comment_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `likes_user_id_comment_id_unique` (`user_id`,`comment_id`),
  KEY `likes_comment_id_foreign` (`comment_id`),
  CONSTRAINT `likes_comment_id_foreign` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_100000_create_password_reset_tokens_table',1),(2,'2019_08_19_000000_create_failed_jobs_table',1),(3,'2019_12_14_000001_create_personal_access_tokens_table',1),(4,'2025_09_04_123235_create_users_table',1),(5,'2025_09_04_125249_create_post_table',1),(6,'2025_09_04_125353_create_comments_table',1),(7,'2025_09_05_093229_create_likes_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\Users',1,'MY_KEY_AXEL','add55909c0f9a18e9dc49a6cd6cdd9309757b7feb685312c2d7221ced177dade','[\"*\"]',NULL,NULL,'2025-09-11 16:33:44','2025-09-11 16:33:44'),(2,'App\\Models\\Users',2,'MY_KEY_AXEL','a5c4e9d826f4f3d0359bb172876e476d3a84a28b6ccf63601a2370fa3955b5c4','[\"*\"]',NULL,NULL,'2025-09-11 16:41:44','2025-09-11 16:41:44'),(3,'App\\Models\\Users',2,'MY_KEY_AXEL','bcd67a6e4f1e882e0190cbbf0864217d1b4c3aa42e2a90d314013b71012de2b2','[\"*\"]',NULL,NULL,'2025-09-11 16:47:44','2025-09-11 16:47:44'),(4,'App\\Models\\Users',2,'MY_KEY_AXEL','aeb7fc85fd3ff221fe320c4fdbee52ed7bd9d2f349f4f30b136f71821ab0d576','[\"*\"]',NULL,NULL,'2025-09-11 16:48:14','2025-09-11 16:48:14'),(5,'App\\Models\\Users',2,'MY_KEY_AXEL','96e5f51d2124961993ecca095a12aa41199e055400dde63b7683727ab33f3748','[\"*\"]',NULL,NULL,'2025-09-11 16:56:36','2025-09-11 16:56:36'),(6,'App\\Models\\Users',1,'MY_KEY_AXEL','afaeb7276e51d10b3904f25cdb81c7f1952e0b84148c39610ed19511258940b2','[\"*\"]',NULL,NULL,'2025-09-11 17:10:59','2025-09-11 17:10:59'),(7,'App\\Models\\Users',9,'MY_KEY_AXEL','859f201292d579616ec65c36dd7f457b17a6bdce8c1bd679032e218bdc06ae2e','[\"*\"]',NULL,NULL,'2025-09-11 17:55:13','2025-09-11 17:55:13'),(8,'App\\Models\\Users',9,'MY_KEY_AXEL','624496db6f9342ebb61536921585b2d538617117e3a34d4697f6c65920e70bdf','[\"*\"]',NULL,NULL,'2025-09-11 17:55:51','2025-09-11 17:55:51'),(9,'App\\Models\\Users',1,'MY_KEY_AXEL','04b79eab3df7439800f2f8dc34e9fd4299ab75b43f94eb210be9e28fe05267d7','[\"*\"]',NULL,NULL,'2025-09-11 18:02:26','2025-09-11 18:02:26'),(10,'App\\Models\\Users',10,'MY_KEY_AXEL','e6f3488699d8f8991d2fd43a16641f10f8f3361e6e2b030177159325af168a61','[\"*\"]',NULL,NULL,'2025-09-11 18:03:44','2025-09-11 18:03:44'),(11,'App\\Models\\Users',1,'MY_KEY_AXEL','75005b7ef8521d232b01776678c19f7bb7a521714d941c033cbb3a14cb59debc','[\"*\"]',NULL,NULL,'2025-09-11 18:08:33','2025-09-11 18:08:33'),(12,'App\\Models\\Users',5,'MY_KEY_AXEL','fe114debe0112a63d39e0b8033f0124ea5f573d79e690d648958d05a4a947241','[\"*\"]',NULL,NULL,'2025-09-11 18:31:02','2025-09-11 18:31:02'),(13,'App\\Models\\Users',3,'MY_KEY_AXEL','5c2a76cb61c80d3f77bc3da7cb2f66b6aa1c90b2d6d246800b1e0dd7acf053eb','[\"*\"]',NULL,NULL,'2025-09-11 18:44:34','2025-09-11 18:44:34'),(14,'App\\Models\\Users',1,'MY_KEY_AXEL','23e8f4288a0447dfb0812fe82b12ac641ac58ddcc5bd96062b94ca195aa28d1c','[\"*\"]',NULL,NULL,'2025-09-11 18:52:35','2025-09-11 18:52:35'),(15,'App\\Models\\Users',9,'MY_KEY_AXEL','58cb3956f654157ce893d16ca1c610bd383a281c9bdd438ecf3826255b01e9a4','[\"*\"]',NULL,NULL,'2025-09-11 19:13:07','2025-09-11 19:13:07'),(16,'App\\Models\\Users',1,'MY_KEY_AXEL','c525cd85a15cdad6228ca78c0221f7a6a7e47dad38caedba8be6f3623aac5396','[\"*\"]',NULL,NULL,'2025-09-11 19:27:43','2025-09-11 19:27:43'),(17,'App\\Models\\Users',9,'MY_KEY_AXEL','22663508adf24fb3311d74bd8d78fa6cb8f3533c1829d6f6ca4103b509b02494','[\"*\"]',NULL,NULL,'2025-09-11 19:58:36','2025-09-11 19:58:36'),(18,'App\\Models\\Users',1,'MY_KEY_AXEL','7b2248e32d733e820afc301042388aee3b9bffaef30ebb6d872caa31029e112e','[\"*\"]',NULL,NULL,'2025-09-12 09:00:53','2025-09-12 09:00:53'),(19,'App\\Models\\Users',1,'MY_KEY_AXEL','b31fe8adc1ace7e8e831935eeec45eb77cd977ffc6bedadd74155456b07cdaf9','[\"*\"]',NULL,NULL,'2025-09-12 09:07:52','2025-09-12 09:07:52');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `post_url` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `users_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_users_id_foreign` (`users_id`),
  CONSTRAINT `posts_users_id_foreign` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `admin` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'enoh','enoh@gmail.com','$2y$12$vf2Gpndhl4JL6uTRdvzn/evubjXbg00xBFNJpc73wMNOPGEfh74jq',1,'2025-09-11 16:33:26','2025-09-11 16:33:26'),(2,'adingra','adingrakoffi@gmail.com','$2y$12$XOXON77gc4R5IRXr.JsCZu1hyPdWwyB7Srwv0voP9euiTXQ7ix6Za',0,'2025-09-11 16:41:03','2025-09-11 17:09:46'),(3,'ange','ange@gmail.com','$2y$12$MXWurFhgK8rs.5i52tO9YOEqouTkVKaiYz2TJw6f7vsWc4hfAvI7u',0,'2025-09-11 17:24:36','2025-09-11 17:24:36'),(4,'anne','anne@gmail.com','$2y$12$GRX00RJFoKIkBwu8uQZpU.W.18TUcUNF8O/kNKoDqGQ8lst3nC2yS',0,'2025-09-11 17:26:11','2025-09-11 17:26:11'),(5,'ama','ama@gmail.com','$2y$12$gi6HK00i5NPe1q/pV21XnuISbqrhzY7luTK7EXNt.e.XDUrBaKPrq',0,'2025-09-11 17:27:07','2025-09-11 17:27:07'),(6,'omo','omo@gmail.com','$2y$12$d6JhHlh.VlEUdAsns75ZfOPQFLm.gQrYj5/X6/fHxw034EOGz6rBe',0,'2025-09-11 17:28:42','2025-09-11 17:28:42'),(7,'imi','imi@gmail.com','$2y$12$R0QcTeEebABv/5OCZWd8AOVfA8ghhEVA9AN4kvuUaKW8fdq4HVUj6',0,'2025-09-11 17:32:54','2025-09-11 17:32:54'),(8,'enoh','adad@gmail.com','$2y$12$EXsnYeqRyHQEWEyab0nJAudNAP30oZJ6uR.EjPAK2XDQ6XTV0fYx.',0,'2025-09-11 17:34:34','2025-09-11 17:40:45'),(9,'axel','axel@gmail.com','$2y$12$sgFpYbMBI/fDG5rn7MGE.ONo6viNf9.yciXaeyz.Km00gfIVud9nS',0,'2025-09-11 17:55:00','2025-09-11 17:55:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-12 10:33:28

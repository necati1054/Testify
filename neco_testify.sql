-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 02 Tem 2024, 19:26:34
-- Sunucu sürümü: 10.5.25-MariaDB
-- PHP Sürümü: 8.2.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `neco_testify`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `answers`
--

CREATE TABLE `answers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `question_id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `correctAnswer` tinyint(1) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `text`, `correctAnswer`, `image_path`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, '5', 0, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(2, 1, '10', 1, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(3, 1, '14', 0, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(4, 1, '1', 0, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(5, 2, '26-30', 1, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(6, 2, '16-20', 0, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(7, 2, '21-25', 0, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(8, 3, '50', 0, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(9, 3, '100', 0, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(10, 3, '20', 0, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(11, 3, '45', 1, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(12, 4, 'Sayfalardan', 1, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(13, 4, 'Kapaktan', 0, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(14, 4, 'Nüsfalardan', 0, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(15, 4, 'Ciltten', 0, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(16, 5, 'a', 0, '1716918378_s5-1.png', '2024-05-28 14:35:15', '2024-05-28 14:46:18', NULL),
(17, 5, 'b', 0, '1716918379_s5-2.png', '2024-05-28 14:35:15', '2024-05-28 14:46:19', NULL),
(18, 5, 'c', 0, '1716918382_s5-3.png', '2024-05-28 14:35:15', '2024-05-28 14:46:22', NULL),
(19, 5, 'd', 1, '1716918385_s5-4.png', '2024-05-28 14:35:15', '2024-05-28 14:46:43', NULL),
(20, 6, '32', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(21, 6, '18', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(22, 6, '24', 1, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(23, 6, '41', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(24, 7, '192', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(25, 7, '268', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(26, 7, '354', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(27, 7, '218', 1, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(28, 8, '9', 1, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(29, 8, '5', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(30, 8, '8', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(31, 8, '3', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(32, 9, '512', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(33, 9, '496', 1, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(34, 9, '387', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(35, 9, '651', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(36, 10, '29', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(37, 10, '68', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(38, 10, '30', 1, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(39, 10, '12', 0, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(40, 11, '4', 0, NULL, '2024-05-29 09:54:03', '2024-05-29 09:54:03', NULL),
(41, 11, '3', 1, NULL, '2024-05-29 09:54:03', '2024-05-29 09:54:03', NULL),
(42, 11, '2', 0, NULL, '2024-05-29 09:54:03', '2024-05-29 09:54:03', NULL),
(43, 11, '1', 0, NULL, '2024-05-29 09:54:03', '2024-05-29 09:54:03', NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_03_02_082350_create_tests_table', 1),
(6, '2024_03_02_082617_create_questions_table', 1),
(7, '2024_03_02_082939_create_answers_table', 1),
(8, '2024_03_02_083326_create_solved_tests_table', 1),
(9, '2024_03_02_083448_create_solved_questions_table', 1),
(10, '2024_03_02_154244_create_settings_table', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `text` varchar(255) NOT NULL,
  `test_id` int(11) NOT NULL,
  `point` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `questions`
--

INSERT INTO `questions` (`id`, `text`, `test_id`, `point`, `type`, `image_path`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '15\'ten sonra hangi sayı gelmelidir?', 1, 20, 1, '1716917831_s1.png', '2024-05-28 14:35:15', '2024-05-28 14:37:11', NULL),
(2, 'Tahminen şurada 4 kenarlı kaç tane şekil vardır?', 1, 20, 1, '1716917893_s2.png', '2024-05-28 14:35:15', '2024-05-28 14:38:13', NULL),
(3, 'Bir toplantı sonunda, 10 tane insan birbiriyle el sıkışmıştır. Toplamda kaç kez el sıkışma yaşanmıştır?', 1, 20, 1, '1716917963_s3.png', '2024-05-28 14:35:15', '2024-05-28 14:39:23', NULL),
(4, 'Kütüphane kitaplardan, kitaplar ise (...) oluşur.', 1, 20, 1, '1716918096_s4.png', '2024-05-28 14:35:15', '2024-05-28 14:41:36', NULL),
(5, 'Aşağıdakilerden hangisi diğerlerinden farklıdır?', 1, 20, 1, NULL, '2024-05-28 14:35:15', '2024-05-28 14:35:15', NULL),
(6, '78 - 54', 2, 20, 1, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(7, '96 + 122', 2, 20, 1, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(8, '63 / 7', 2, 20, 1, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(9, '62 * 8', 2, 20, 1, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(10, '15 * 2', 2, 20, 1, NULL, '2024-05-28 14:48:39', '2024-05-28 14:48:39', NULL),
(11, '2+1=?', 5, 100, 1, NULL, '2024-05-29 09:54:03', '2024-05-29 09:54:03', NULL),
(12, 'İstanbul’un feth edilme tarihi nedir?', 6, 100, 2, NULL, '2024-05-29 14:02:20', '2024-05-29 14:02:20', NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` text NOT NULL,
  `value` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'phone', '+90 5557778899', '2024-05-28 08:58:18', '2024-05-28 08:58:18', NULL),
(2, 'email', 'info@testify.com', '2024-05-28 08:58:18', '2024-05-28 08:58:18', NULL),
(3, 'address', 'Türkiye', '2024-05-28 08:58:18', '2024-05-28 08:58:18', NULL),
(4, 'facebook', 'Testify', '2024-05-28 08:58:18', '2024-05-28 08:58:18', NULL),
(5, 'instagram', 'Testify', '2024-05-28 08:58:18', '2024-05-28 08:58:18', NULL),
(6, 'logo', 'logo.jpg', '2024-05-28 08:58:18', '2024-05-28 09:21:58', NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `solved_questions`
--

CREATE TABLE `solved_questions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `solved_test_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `given_answer_id` varchar(100) DEFAULT NULL,
  `given_answer_text` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `solved_questions`
--

INSERT INTO `solved_questions` (`id`, `solved_test_id`, `question_id`, `given_answer_id`, `given_answer_text`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 11, '41', NULL, '2024-05-29 09:55:29', NULL, NULL),
(2, 2, 10, '38', NULL, '2024-05-30 12:27:04', NULL, NULL),
(3, 2, 8, '29', NULL, '2024-05-30 12:27:04', NULL, NULL),
(4, 2, 7, '27', NULL, '2024-05-30 12:27:04', NULL, NULL),
(5, 2, 9, '33', NULL, '2024-05-30 12:27:04', NULL, NULL),
(6, 2, 6, '22', NULL, '2024-05-30 12:27:04', NULL, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `solved_tests`
--

CREATE TABLE `solved_tests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `total_point` int(11) NOT NULL,
  `solved_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `solved_tests`
--

INSERT INTO `solved_tests` (`id`, `user_id`, `test_id`, `total_point`, `solved_date`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 8, 5, 100, '2024-05-29', '2024-05-29 09:55:29', '2024-05-29 09:55:29', NULL),
(2, 3, 2, 80, '2024-05-30', '2024-05-30 12:27:04', '2024-05-30 12:27:04', NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tests`
--

CREATE TABLE `tests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `testName` varchar(255) NOT NULL,
  `totalPoint` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `tests`
--

INSERT INTO `tests` (`id`, `user_id`, `testName`, `totalPoint`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, 'IQ (aykü🤣) testi', 100, '2024-05-28 14:29:39', '2024-05-28 14:29:39', NULL),
(2, 4, 'Kolay Matematik Testi', 100, '2024-05-28 14:39:51', '2024-05-28 14:49:20', NULL),
(3, 5, 'Mali analiz', 100, '2024-05-28 15:07:11', '2024-05-28 15:07:11', NULL),
(4, 2, 'denemeTest', 100, '2024-05-28 15:18:40', '2024-05-28 15:19:31', '2024-05-28 15:19:31'),
(5, 7, 'Matematik', 100, '2024-05-29 09:53:05', '2024-05-29 09:53:05', NULL),
(6, 4, 'Açık uçlu test', 100, '2024-05-29 14:01:15', '2024-05-29 14:01:15', NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `role`, `is_active`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'admin', 'admin', 'admin@gmail.com', '$2y$12$jaCH214YcQWhP6ir8OGlh.7kuIAGq2BuJtJfVUGZ7Qf5tgJp5Qh4G', 1, 1, NULL, '2024-05-28 08:53:36', NULL, NULL),
(2, 'admin', 'teacher', 'admint@gmail.com', '$2y$12$Sw4an/C9vSIRgAYp70OWv.h0pYkzEpOL89iKzVpaIjX3DY9fP0rte', 2, 1, NULL, '2024-05-28 08:53:36', NULL, NULL),
(3, 'admin', 'student', 'admins@gmail.com', '$2y$12$t7u2gUraqOk3wwhYBxDjLOqvfBW8qzshhTio0odUc6UeC5Rda/A32', 3, 1, NULL, '2024-05-28 08:53:36', NULL, NULL),
(4, 'Alperen', 'KAYA', 'alperenkaya@gmail.com', '$2y$12$i2R6/1dJIguiD07WR5qmxeqxByKr7fX3MZffP61Yc6JYQDagVkGY6', 2, 1, NULL, '2024-05-28 14:39:17', '2024-05-28 14:39:17', NULL),
(5, 'Ahmet', 'Özçelik', 'ahmetze209@gmail.com', '$2y$12$AUleSSjUkR5x69sryX2TBe/W4lAp3mzOXJ6ij0RReRMsn6SxHfhpG', 2, 1, NULL, '2024-05-28 15:06:26', '2024-05-28 15:06:26', NULL),
(6, 'ahmet', 'Özçelik', 'ahmetze209a@gmail.com', '$2y$12$OS/0GJXBAXaoenU8JR935umt5qT0W.0VlvTTrQCAxkT4qpk38sFS.', 3, 1, NULL, '2024-05-28 15:15:26', '2024-05-28 15:15:26', NULL),
(7, 'Mücahit', 'Günay', 'mg@mucahitgunay.com.tr', '$2y$12$.6Z7qEaUe7FVuYowlwKga.nMk9xNDuxFk2TPweWk570vW1fAd.1hi', 2, 1, NULL, '2024-05-29 09:52:31', '2024-05-29 09:52:31', NULL),
(8, 'mucahit', 'gunay', 'teknococuk07@gmail.com', '$2y$12$UiHFiAoouP.4K1DDbiijxu53F7mRrY6aBrtJD159h2IwzUZ/WxyAG', 3, 1, NULL, '2024-05-29 09:54:46', '2024-05-29 09:54:46', NULL);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Tablo için indeksler `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Tablo için indeksler `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`) USING HASH;

--
-- Tablo için indeksler `solved_questions`
--
ALTER TABLE `solved_questions`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `solved_tests`
--
ALTER TABLE `solved_tests`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tests_user_id_index` (`user_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `answers`
--
ALTER TABLE `answers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Tablo için AUTO_INCREMENT değeri `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tablo için AUTO_INCREMENT değeri `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Tablo için AUTO_INCREMENT değeri `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `solved_questions`
--
ALTER TABLE `solved_questions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `solved_tests`
--
ALTER TABLE `solved_tests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `tests`
--
ALTER TABLE `tests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 13 Agu 2021 pada 14.32
-- Versi Server: 10.1.26-MariaDB
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employee`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `officialdom`
--

CREATE TABLE `officialdom` (
  `officialdom_id` int(11) NOT NULL,
  `officialdom_nik` varchar(16) NOT NULL,
  `officialdom_division` varchar(250) NOT NULL,
  `officialdom_status` varchar(250) NOT NULL,
  `officialdom_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `officialdom_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `officialdom`
--

INSERT INTO `officialdom` (`officialdom_id`, `officialdom_nik`, `officialdom_division`, `officialdom_status`, `officialdom_created_at`, `officialdom_updated_at`) VALUES
(4, '1234567890123456', 'developer', 'active', '2021-08-08 13:52:33', NULL),
(7, '1111111111111111', 'manager', 'active', '2021-08-13 03:16:09', NULL),
(8, '2222222222222222', 'finance', 'active', '2021-08-13 09:45:44', '2021-08-13 11:04:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_nik` varchar(16) NOT NULL,
  `user_password` varchar(250) NOT NULL,
  `user_role` varchar(100) NOT NULL,
  `user_image` varchar(250) NOT NULL,
  `user_email` varchar(250) NOT NULL,
  `user_fullname` varchar(200) NOT NULL,
  `user_phone_number` varchar(50) NOT NULL,
  `user_membership` varchar(100) NOT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_nik`, `user_password`, `user_role`, `user_image`, `user_email`, `user_fullname`, `user_phone_number`, `user_membership`, `user_created_at`, `user_updated_at`) VALUES
('1111111111111111', '$2b$10$mIXm42oC8tv8TC5uGs51bu4KBT.MroJKWXX6RBUxUIS2TI8SUb6..', 'manager', '2021-08-13T01-19-55.809Zuser1.jpg', 'a@gmail.com', 'Andika Pratama Siregar', '087921374876', 'verified', '2021-08-12 11:40:42', '2021-08-13 01:44:57'),
('1234567890123453', '$2b$10$gOfvMaKhKYnT3H/V62JCVemWDtweAp8baR3tsYvMS0OAo8K/iyLze', 'employee', '', 'tes@gmail.com', 'user284641530740', '', 'unknown', '2021-08-13 00:08:39', '2021-08-13 11:30:00'),
('1234567890123456', '$2b$10$ybUUzjsPNAuNg12CyqZR/OteDBnb6ybtQo9a1xjBcFLnVwlKOp79q', 'employee', '2021-08-13T00-57-08.579Zuser26.jpg', 'banuaputrasagara@gmail.com', 'Banua Putra Sugara', '085612087569', 'verified', '2021-08-13 00:11:18', '2021-08-13 00:57:08'),
('1234567890123459', '$2b$10$egv.f06xrTp/fC/Uikk7Bekt4pNO7h1nCAjTe.oIi5U70eJXcMbsu', 'employee', '', 'user1234@gmail.com', 'user204150584790', '', 'unknown', '2021-08-13 00:10:34', '2021-08-13 10:39:25'),
('2222222222222222', '$2b$10$MmkCAVrhIBMNWxyA9Lum..9NUB1SGtFQQT7Co1uw.4dvz1bKNCM9C', 'employee', '2021-08-13T00-59-40.472Zuser2.jpg', 'indri23gnd@gmail.com', 'Indriana Gundha', '0523467162526', 'verified', '2021-08-13 00:57:54', '2021-08-13 09:45:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `officialdom`
--
ALTER TABLE `officialdom`
  ADD PRIMARY KEY (`officialdom_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_nik`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `officialdom`
--
ALTER TABLE `officialdom`
  MODIFY `officialdom_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

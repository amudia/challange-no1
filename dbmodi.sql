-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2020 at 02:09 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbmodi`
--

-- --------------------------------------------------------

--
-- Table structure for table `revoked_token`
--

CREATE TABLE `revoked_token` (
  `id` int(11) NOT NULL,
  `token` varchar(300) NOT NULL,
  `is_revoked` int(1) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `revoked_token`
--

INSERT INTO `revoked_token` (`id`, `token`, `is_revoked`, `created_on`, `updated_on`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkMXRuMSIsImlkdXNlciI6Mywicm9sZXMiOjIsImlkIjoxLCJpYXQiOjE1OTIxMzUyOTV9.P8BXus0DGAIYSXS0yIaKFvLc6K5aIUvR2OfTzo0SSS8', 1, '2020-06-14 11:48:15', '2020-06-14 11:48:15'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNwMXRuMSIsImlkdXNlciI6MSwicm9sZXMiOjEsImlkIjoxLCJpYXQiOjE1OTIxMzUzMzV9.sB6wRD-xHc2dkRuHXjtd0BN95dsmKrrTP_U8_BwJzYo', 1, '2020-06-14 11:48:55', '2020-06-14 11:48:55'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRyMXRuMSIsImlkdXNlciI6NSwicm9sZXMiOjMsImlkIjoxLCJpYXQiOjE1OTIxMzUzNjl9.2ICt7UPKzb46xIHM6DukloFfO7wf3bheKqfhJBc0Ifc', 0, '2020-06-14 11:49:29', '2020-06-14 11:49:29'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRyMXRuMSIsImlkdXNlciI6NSwicm9sZXMiOjMsImlkIjoxLCJpYXQiOjE1OTIxMzUzNzR9.Nky3A97QhydPZZtHCqBqaH6kqsbM3M8B7-R4ATP-A68', 0, '2020-06-14 11:49:34', '2020-06-14 11:49:34'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRyMXRuMSIsImlkdXNlciI6NSwicm9sZXMiOjMsImlkIjoxLCJpYXQiOjE1OTIxMzUzNzZ9.9SK1rH7NSCfIdbcPHM-DMK7xMBftwOgdisLlBp6Zzog', 0, '2020-06-14 11:49:36', '2020-06-14 11:49:36'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRyMXRuMSIsImlkdXNlciI6NSwicm9sZXMiOjMsImlkIjoxLCJpYXQiOjE1OTIxMzUzODV9.xqXCUHRI8PEjDnZw8e3O0XRu7qvyFVe_xJZbs98Kd1A', 0, '2020-06-14 11:49:45', '2020-06-14 11:49:45');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_role`
--

CREATE TABLE `tbl_role` (
  `id_role` int(11) NOT NULL,
  `name_role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_role`
--

INSERT INTO `tbl_role` (`id_role`, `name_role`) VALUES
(1, 'Superadmin'),
(2, 'Admin'),
(3, 'Director'),
(4, 'Head of engineering '),
(5, 'Operator');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tenant`
--

CREATE TABLE `tbl_tenant` (
  `id_tenant` int(11) NOT NULL,
  `name_tenant` varchar(50) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_tenant`
--

INSERT INTO `tbl_tenant` (`id_tenant`, `name_tenant`, `created_on`, `updated_on`) VALUES
(1, 'A', '2020-06-12 04:35:35', '2020-06-12 04:35:35'),
(2, 'B', '2020-06-12 04:35:35', '2020-06-12 04:35:35'),
(3, 'C', '2020-06-12 04:35:43', '2020-06-12 04:35:43'),
(4, 'D', '2020-06-12 04:35:43', '2020-06-12 04:35:43'),
(5, 'E', '2020-06-13 14:30:44', '2020-06-13 14:37:15');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id_user` int(11) NOT NULL,
  `id_role` int(11) NOT NULL,
  `id_tenant` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id_user`, `id_role`, `id_tenant`, `fullname`, `username`, `password`, `created_on`, `updated_on`) VALUES
(1, 1, 1, 'Superadmin 1 Tenant 1', 'sp1tn1', '$2a$10$eUk7pi3QzPjl5.63x.yPeOaHFr87bu85peyCsgBUDVJDq/xMoTBB6', '2020-06-11 06:30:35', '2020-06-13 10:31:56'),
(2, 1, 3, 'Superadmin 2 Tenant 3', 'sp2tn2', '$2a$10$qGgtXVzZWTIDdxqd2dLenuwd6C4efh9pjruMqF1puyd3mQFQm1ply', '2020-06-11 06:30:53', '2020-06-13 09:07:18'),
(3, 2, 1, 'admin 1 Tenant 2', 'ad1tn1', '$2a$10$LNNoOCkZISDxTpV7FtoTCeJmoNGFri8eVOB47xl13KLF.Rw4bZ6Jq', '2020-06-11 06:31:26', '2020-06-13 09:05:33'),
(4, 3, 2, 'DIrector 2 tenant 2', 'dr2tn2', '$2a$10$ycunhbnESrlvE50JAwpMQ.ByouGLQqfYBW1anci7C7WuIPsGLP1IC', '2020-06-11 06:31:39', '2020-06-13 09:05:45'),
(5, 3, 1, 'Director 1 Tenant 1', 'dr1tn1', '$2a$10$//6PE6v8XL0GR2eU/hhkFe64MGBqhFky8UbnaY7HGzNy2Apx9S7EG', '2020-06-11 06:31:56', '2020-06-11 06:31:56'),
(6, 4, 1, 'head1 Tenant 1', 'hd1tn1', '$2a$10$qMHrX1myazcN.1dfUH60cunQ4Yr8OgC7350KaciFhMEX3/tzFrb3a', '2020-06-11 09:24:05', '2020-06-11 09:24:05'),
(7, 5, 1, 'operator 1Tenant 1', 'op1tn1', '$2a$10$LVO/fnB11IYESaFln1IyreRzKSuzwZDhdmRG.BrBaQtrTDMpjEz3a', '2020-06-11 09:24:32', '2020-06-11 09:24:32'),
(9, 1, 4, 'Amudia Kalpa Taruna', 'amudia', '$2a$10$UgEXmq18ShUPh5/b3iMpzOASGFJ0cWZ/zw/6dsbyK3AHSyc/lq29C', '2020-06-13 09:12:09', '2020-06-13 09:12:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `revoked_token`
--
ALTER TABLE `revoked_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_role`
--
ALTER TABLE `tbl_role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `tbl_tenant`
--
ALTER TABLE `tbl_tenant`
  ADD PRIMARY KEY (`id_tenant`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `revoked_token`
--
ALTER TABLE `revoked_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_role`
--
ALTER TABLE `tbl_role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_tenant`
--
ALTER TABLE `tbl_tenant`
  MODIFY `id_tenant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

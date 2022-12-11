-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 11, 2022 lúc 05:54 AM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `breakoutbrick`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ball`
--

CREATE TABLE `ball` (
  `username` varchar(50) NOT NULL,
  `ball_x` int(11) NOT NULL DEFAULT 0,
  `ball_y` int(11) NOT NULL DEFAULT 0,
  `sBall_x` int(11) NOT NULL DEFAULT 4,
  `sBall_y` int(11) NOT NULL DEFAULT 4
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `ball`
--

INSERT INTO `ball` (`username`, `ball_x`, `ball_y`, `sBall_x`, `sBall_y`) VALUES
('admin@bofile.com', 150, 258, -5, -3),
('tranmyhanh001@gmail.com', 633, 24, -2, -6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bricks`
--

CREATE TABLE `bricks` (
  `brick` varchar(1000) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `bricks`
--

INSERT INTO `bricks` (`brick`, `username`) VALUES
('', 'tranmyhanh001@gmail.com'),
('14 50 112 50 210 50 308 50 406 50 504 50 602 50 700 50 798 50 896 50 14 88 112 88 210 88 308 88 406 88 504 88 602 88 700 88 798 88 896 88 14 126 112 126 210 126 308 126 406 126 504 126 602 126 700 126 798 126 896 126 14 164 112 164 308 164 504 164 602 164 798 164 ', 'admin@bofile.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `paddle`
--

CREATE TABLE `paddle` (
  `paddle_x` int(11) NOT NULL DEFAULT 0,
  `paddle_y` int(11) NOT NULL DEFAULT 0,
  `paddle_speed` int(11) NOT NULL DEFAULT 14,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `paddle`
--

INSERT INTO `paddle` (`paddle_x`, `paddle_y`, `paddle_speed`, `username`) VALUES
(752, 566, 14, 'tranmyhanh001@gmail.com'),
(-4, 566, 14, 'admin@bofile.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `score`
--

CREATE TABLE `score` (
  `username` varchar(50) NOT NULL,
  `scoreUser` int(11) NOT NULL DEFAULT 0,
  `unit` int(11) NOT NULL DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `score`
--

INSERT INTO `score` (`username`, `scoreUser`, `unit`) VALUES
('admin@bofile.com', 12, 3),
('tranmyhanh001@gmail.com', 21, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`username`, `pass`, `name`, `status`) VALUES
('admin@bofile.com', '827ccb0eea8a706c4c34a16891f84e7b', 'cuối kỳ', 0),
('tranmyhanh001@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'hanh', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `ball`
--
ALTER TABLE `ball`
  ADD UNIQUE KEY `username` (`username`);

--
-- Chỉ mục cho bảng `bricks`
--
ALTER TABLE `bricks`
  ADD KEY `FK_bricks` (`username`);

--
-- Chỉ mục cho bảng `paddle`
--
ALTER TABLE `paddle`
  ADD KEY `username` (`username`);

--
-- Chỉ mục cho bảng `score`
--
ALTER TABLE `score`
  ADD UNIQUE KEY `username` (`username`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `ball`
--
ALTER TABLE `ball`
  ADD CONSTRAINT `ball_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`);

--
-- Các ràng buộc cho bảng `bricks`
--
ALTER TABLE `bricks`
  ADD CONSTRAINT `FK_bricks` FOREIGN KEY (`username`) REFERENCES `user` (`username`);

--
-- Các ràng buộc cho bảng `paddle`
--
ALTER TABLE `paddle`
  ADD CONSTRAINT `paddle_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`);

--
-- Các ràng buộc cho bảng `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `score_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

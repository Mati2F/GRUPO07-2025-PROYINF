-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-11-2024 a las 03:35:39
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `analisis`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `url` varchar(11) NOT NULL,
  `categorias` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `url`, `categorias`) VALUES
(3, 'http://exam', 'Lluvia'),
(4, 'http://exam', 'Sequia'),
(5, 'http://exam', 'Incendio'),
(6, 'http://exam', 'Alimentos'),
(7, 'http://exam', 'Apicultura'),
(8, 'http://exam', 'Berries'),
(9, 'http://exam', 'Bioenergía'),
(10, 'http://exam', 'Ovinos'),
(11, 'http://exam', 'TIC'),
(12, 'http://exam', 'Lluvia'),
(13, 'http://exam', 'Sequia'),
(14, 'http://exam', 'Incendio'),
(15, 'http://exam', 'Alimentos'),
(16, 'http://exam', 'Apicultura'),
(17, 'http://exam', 'Berries'),
(18, 'http://exam', 'Bioenergía'),
(19, 'http://exam', 'Ovinos'),
(20, 'http://exam', 'TIC'),
(21, 'http://exam', 'Lluvia'),
(22, 'http://exam', 'Sequia'),
(23, 'http://exam', 'Incendio'),
(24, 'http://exam', 'Alimentos'),
(25, 'http://exam', 'Apicultura'),
(26, 'http://exam', 'Berries'),
(27, 'http://exam', 'Bioenergía'),
(28, 'http://exam', 'Ovinos'),
(29, 'http://exam', 'TIC'),
(30, 'http://exam', 'Lluvia'),
(31, 'http://exam', 'Sequia'),
(32, 'http://exam', 'Incendio'),
(33, 'http://exam', 'Alimentos'),
(34, 'http://exam', 'Apicultura'),
(35, 'http://exam', 'Berries');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Rol` tinyint(1) DEFAULT NULL,
  `Correo` varchar(255) DEFAULT NULL,
  `Pwd` varchar(15) DEFAULT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellidos` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`UserID`, `Rol`, `Correo`, `Pwd`, `Nombre`, `Apellidos`) VALUES
(1, 0, 'abc@gmail.com', 'a', 'Alberto', 'Lobos'),
(3, 1, 'maria@gmail.com', 'c', 'María', 'Gómez'),
(8, 1, 'quispe@peru.pe', NULL, 'Dani', 'Quiste'),
(9, 1, 'fujo@usm.cl', NULL, 'francisca', 'valenzuela'),
(11, 1, 'matigol@pinga.cl', 'lololol', 'Matias', 'Gol'),
(12, 0, 'tonto@tontin.cl', NULL, 'Pajon', 'Sapo Brujo'),
(13, 1, 'malva@nonada.com', 'pinga', 'malva', 'sapo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

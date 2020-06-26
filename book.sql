-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        8.0.17 - MySQL Community Server - GPL
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 library 的数据库结构
CREATE DATABASE IF NOT EXISTS `library` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `library`;

-- 导出  表 library.admin_user 结构
CREATE TABLE IF NOT EXISTS `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` char(50) NOT NULL,
  `password` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 正在导出表  library.admin_user 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` (`id`, `userName`, `password`) VALUES
	(1, 'Dgjtfgh', '123456');
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;

-- 导出  表 library.book 结构
CREATE TABLE IF NOT EXISTS `book` (
  `bno` varchar(7) NOT NULL,
  `type` varchar(40) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `press` varchar(20) DEFAULT NULL,
  `year` date DEFAULT NULL,
  `author` varchar(20) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`bno`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 正在导出表  library.book 的数据：~6 rows (大约)
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` (`bno`, `type`, `title`, `press`, `year`, `author`, `price`, `total`, `stock`, `id`) VALUES
	('A0012', '历史', '世界历史100问', '清华大学出版社', '2009-06-02', '吴江', 50, 20, 3, 1),
	('A0013', '历史', '中国历史', '清华大学出版社', '2014-06-06', '吴江', 30, 5, 4, 6),
	('C0001', '计算机', 'C语言程序设计', '浙江大学出版社', '2014-08-27', '白洪欢', 20, 50, 50, 2),
	('E0001', '英语', '英语小说欣赏', '北京大学出版社', '2011-02-23', '李鸣', 30, 20, 18, 3),
	('S0001', '物理', '大学物理', '浙江大学出版社', '2010-07-10', '郑大方', 40, 15, 15, 4),
	('T0001', '数学', '微积分', '机械工业出版社', '2013-06-23', '苏德矿', 80, 20, 20, 5);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;

-- 导出  表 library.borrow 结构
CREATE TABLE IF NOT EXISTS `borrow` (
  `cno` varchar(11) NOT NULL,
  `bno` varchar(7) NOT NULL,
  `borrow_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `manager` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 正在导出表  library.borrow 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `borrow` DISABLE KEYS */;
INSERT INTO `borrow` (`cno`, `bno`, `borrow_date`, `return_date`, `manager`) VALUES
	('3150101023', 'A0012', '2020-06-04', '2020-08-04', '001'),
	('3150102356', 'E0001', '2020-06-14', '2020-08-14', '001');
/*!40000 ALTER TABLE `borrow` ENABLE KEYS */;

-- 导出  表 library.customer 结构
CREATE TABLE IF NOT EXISTS `customer` (
  `cno` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '借书证号',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '姓名',
  `department` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学院',
  `type` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '身份',
  PRIMARY KEY (`cno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 正在导出表  library.customer 的数据：~5 rows (大约)
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` (`cno`, `name`, `department`, `type`) VALUES
	('3150101023', '小红', '传媒学院', '学生'),
	('3150102019', '小王', '机械学院', '学生'),
	('3150102356', '小明', '外语学院', '学生'),
	('3150104110', '小强', '计算机学院', '学生');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*
 Navicat Premium Data Transfer

 Source Server         : zcpro
 Source Server Type    : MySQL
 Source Server Version : 50731
 Source Host           : localhost:3306
 Source Schema         : iviewuipro

 Target Server Type    : MySQL
 Target Server Version : 50731
 File Encoding         : 65001

 Date: 20/04/2021 20:14:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_admin
-- ----------------------------
DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin` (
  `ano` int(55) NOT NULL AUTO_INCREMENT,
  `loginname` varchar(55) DEFAULT NULL,
  `pwd` varchar(55) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ano`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of t_admin
-- ----------------------------
BEGIN;
INSERT INTO `t_admin` VALUES (1, 'admin', '12345', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (2, 'zc', '12345', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (3, 'lcj', '12345', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (4, '二哈', '12345', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (5, '傻子', '12345', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (6, '你好', '11111', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (7, '马超', '12345', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (8, '我爱木', '12345', '123456789@qq.com');
COMMIT;

-- ----------------------------
-- Table structure for t_class
-- ----------------------------
DROP TABLE IF EXISTS `t_class`;
CREATE TABLE `t_class` (
  `classno` int(55) NOT NULL AUTO_INCREMENT,
  `cname` varchar(55) DEFAULT NULL,
  `cteacher` varchar(55) DEFAULT NULL,
  `classroom` varchar(55) DEFAULT NULL,
  PRIMARY KEY (`classno`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of t_class
-- ----------------------------
BEGIN;
INSERT INTO `t_class` VALUES (1, '软件1班', 'zc', '102');
INSERT INTO `t_class` VALUES (2, '软件2班', '周老师', '103');
INSERT INTO `t_class` VALUES (3, '大数据1班', '徐老师', '201');
INSERT INTO `t_class` VALUES (4, '大数据2班', '蔡老师', '202');
COMMIT;

-- ----------------------------
-- Table structure for t_course
-- ----------------------------
DROP TABLE IF EXISTS `t_course`;
CREATE TABLE `t_course` (
  `cno` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(30) DEFAULT NULL,
  `credit` int(11) DEFAULT NULL,
  `startDate` varchar(100) DEFAULT NULL,
  `endDate` varchar(100) DEFAULT NULL,
  `tno` int(11) DEFAULT NULL,
  PRIMARY KEY (`cno`) USING BTREE,
  KEY `tno` (`tno`) USING BTREE,
  CONSTRAINT `t_course_ibfk_1` FOREIGN KEY (`tno`) REFERENCES `t_teacher` (`tno`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of t_course
-- ----------------------------
BEGIN;
INSERT INTO `t_course` VALUES (1, 'JAVA编程基础', 10, '2019-09-11', '2020-02-15', 3);
INSERT INTO `t_course` VALUES (2, 'Spring开发技术', 10, '2019-10-09', '2020-03-10', 2);
INSERT INTO `t_course` VALUES (3, 'SpringMVC实战', 20, '2019-08-12', '2020-02-03', 4);
INSERT INTO `t_course` VALUES (4, 'JavaScript', 11, '2018-12-03T16:00:00.000Z', '2019-12-04T16:00:00.000Z', 2);
INSERT INTO `t_course` VALUES (5, 'node', 80, '2021-04-05T16:00:00.000Z', '2021-04-05T16:00:00.000Z', 7);
INSERT INTO `t_course` VALUES (6, 'ajax', 123, '2021-04-25T16:00:00.000Z', '2020-05-07T16:00:00.000Z', 6);
INSERT INTO `t_course` VALUES (7, 'jquery', 14, '2013-05-08T16:00:00.000Z', '2021-03-30T16:00:00.000Z', 5);
COMMIT;

-- ----------------------------
-- Table structure for t_student
-- ----------------------------
DROP TABLE IF EXISTS `t_student`;
CREATE TABLE `t_student` (
  `sno` int(20) NOT NULL AUTO_INCREMENT,
  `pwd` varchar(55) DEFAULT NULL,
  `sname` varchar(55) DEFAULT NULL,
  `phone` varchar(55) DEFAULT NULL,
  `gender` varchar(2) DEFAULT NULL,
  `birth` varchar(100) DEFAULT NULL,
  `classno` int(55) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sno`) USING BTREE,
  KEY `pr_claass` (`classno`) USING BTREE,
  CONSTRAINT `pr_claass` FOREIGN KEY (`classno`) REFERENCES `t_class` (`classno`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20170107 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of t_student
-- ----------------------------
BEGIN;
INSERT INTO `t_student` VALUES (20170101, '123', '徐青', '15827162289', '女', '1990-08-12', 2, '好学青年', '1583741285@qq.com');
INSERT INTO `t_student` VALUES (20170102, '123', '张晨', '15612882786', '男', '1990-02-23', 1, '好学青年', '1583741285@qq.com');
INSERT INTO `t_student` VALUES (20170103, '12345', '刘晓明', '15918228922', '男', '1991-06-22', 2, '喜欢技术', '1583741285@qq.com');
INSERT INTO `t_student` VALUES (20170104, '12345', '徐二牛', '18617222887', '男', '1991-05-23', 2, '热爱技术', '1583741285@qq.com');
COMMIT;

-- ----------------------------
-- Table structure for t_student_course
-- ----------------------------
DROP TABLE IF EXISTS `t_student_course`;
CREATE TABLE `t_student_course` (
  `sno` int(100) NOT NULL,
  `cno` int(100) NOT NULL,
  PRIMARY KEY (`sno`,`cno`) USING BTREE,
  KEY `t_student_course_ibfk_2` (`cno`) USING BTREE,
  CONSTRAINT `t_student_course_ibfk_1` FOREIGN KEY (`sno`) REFERENCES `t_student` (`sno`) ON DELETE CASCADE,
  CONSTRAINT `t_student_course_ibfk_2` FOREIGN KEY (`cno`) REFERENCES `t_course` (`cno`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of t_student_course
-- ----------------------------
BEGIN;
INSERT INTO `t_student_course` VALUES (20170101, 2);
INSERT INTO `t_student_course` VALUES (20170101, 5);
INSERT INTO `t_student_course` VALUES (20170101, 6);
INSERT INTO `t_student_course` VALUES (20170101, 7);
COMMIT;

-- ----------------------------
-- Table structure for t_teacher
-- ----------------------------
DROP TABLE IF EXISTS `t_teacher`;
CREATE TABLE `t_teacher` (
  `tno` int(11) NOT NULL AUTO_INCREMENT,
  `loginname` varchar(20) NOT NULL,
  `tname` varchar(25) DEFAULT NULL,
  `pwd` varchar(55) DEFAULT NULL,
  `phone` varchar(55) DEFAULT NULL,
  `hiredate` varchar(300) DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tno`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of t_teacher
-- ----------------------------
BEGIN;
INSERT INTO `t_teacher` VALUES (1, ' jack', '王希文', '12345', '11136172228', '2018-02-01 00:00:00', '1高级程序员转老师', '1583741285@qq.com');
INSERT INTO `t_teacher` VALUES (2, 'liuyu', '刘宇', '12345', '15623477374', '2017-10-24 00:00:00', '高级java工程师', '1583741285@qq.com');
INSERT INTO `t_teacher` VALUES (3, 'machao', '马超', '12345', '18212734776', '2017-12-10 00:00:00', '高级java项目经理', '1583741285@qq.com');
INSERT INTO `t_teacher` VALUES (4, 'mike', '闫立忠', '12345', '13918283488', '2016-11-22 00:00:00', '高级java工程师', '1583741285@qq.com');
INSERT INTO `t_teacher` VALUES (5, 'qison', '王业启', '110110', '13163304417', '2019-12-27T16:00:00.000Z', '王业启喜欢女装，还喜欢唱跳rap。。。。。。。。。。。。。。。。。。。。。。。', '11000@qq.com');
INSERT INTO `t_teacher` VALUES (6, 'zc', '李二傻', '111', '123123213', '2019-12-23T16:00:00.000Z', '1wqeqweqwe21321312321312321', '1583741285@qq.com');
INSERT INTO `t_teacher` VALUES (7, 'zaaaa', 'zc', '111', '213213213213', '2019-12-23T16:00:00.000Z', '1583741285@qq.com1583741285@qq.com1583741285@qq.com', '1583741285@qq.com');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

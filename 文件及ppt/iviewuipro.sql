/*
 Navicat Premium Data Transfer

 Source Server         : mysqlzc
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : iviewuipro

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 29/12/2019 17:04:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_admin
-- ----------------------------
DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin`  (
  `ano` int(55) NOT NULL AUTO_INCREMENT,
  `loginname` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pwd` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ano`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_admin
-- ----------------------------
INSERT INTO `t_admin` VALUES (1, 'admin', '12345', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (2, 'zc', '12345', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (3, 'lcj', '12345', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (4, '二哈', '12345', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (5, '傻子', '12345', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (6, '你好', '11111', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (7, '马超', '12345', '1583741285@qq.com');
INSERT INTO `t_admin` VALUES (8, '我爱木', '12345', '123456789@qq.com');

-- ----------------------------
-- Table structure for t_class
-- ----------------------------
DROP TABLE IF EXISTS `t_class`;
CREATE TABLE `t_class`  (
  `classno` int(55) NOT NULL AUTO_INCREMENT,
  `cname` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cteacher` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `classroom` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`classno`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_class
-- ----------------------------
INSERT INTO `t_class` VALUES (1, '软件1班', 'zc', '102');
INSERT INTO `t_class` VALUES (2, '软件2班', '周老师', '103');
INSERT INTO `t_class` VALUES (3, '大数据1班', '徐老师', '201');
INSERT INTO `t_class` VALUES (4, '大数据2班', '蔡老师', '202');

-- ----------------------------
-- Table structure for t_course
-- ----------------------------
DROP TABLE IF EXISTS `t_course`;
CREATE TABLE `t_course`  (
  `cno` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `credit` int(11) NULL DEFAULT NULL,
  `startDate` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `endDate` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tno` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`cno`) USING BTREE,
  INDEX `tno`(`tno`) USING BTREE,
  CONSTRAINT `t_course_ibfk_1` FOREIGN KEY (`tno`) REFERENCES `t_teacher` (`tno`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_course
-- ----------------------------
INSERT INTO `t_course` VALUES (1, 'JAVA编程基础', 10, '2019-09-11', '2020-02-15', 3);
INSERT INTO `t_course` VALUES (2, 'Spring开发技术', 10, '2019-10-09', '2020-03-10', 2);
INSERT INTO `t_course` VALUES (3, 'SpringMVC实战', 20, '2019-08-12', '2020-02-03', 4);
INSERT INTO `t_course` VALUES (4, 'JavaScript', 11, '2018-12-03T16:00:00.000Z', '2019-12-04T16:00:00.000Z', 2);

-- ----------------------------
-- Table structure for t_student
-- ----------------------------
DROP TABLE IF EXISTS `t_student`;
CREATE TABLE `t_student`  (
  `sno` int(20) NOT NULL AUTO_INCREMENT,
  `pwd` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sname` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `birth` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `classno` int(55) NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`sno`) USING BTREE,
  INDEX `pr_claass`(`classno`) USING BTREE,
  CONSTRAINT `pr_claass` FOREIGN KEY (`classno`) REFERENCES `t_class` (`classno`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 20170107 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_student
-- ----------------------------
INSERT INTO `t_student` VALUES (20170101, '123', '徐青', '15827162289', '女', '1990-08-12', 2, '好学青年', '1583741285@qq.com');
INSERT INTO `t_student` VALUES (20170102, '123', '张晨', '15612882786', '男', '1990-02-23', 1, '好学青年', '1583741285@qq.com');
INSERT INTO `t_student` VALUES (20170103, '12345', '刘晓明', '15918228922', '男', '1991-06-22', 2, '喜欢技术', '1583741285@qq.com');
INSERT INTO `t_student` VALUES (20170104, '12345', '徐二牛', '18617222887', '男', '1991-05-23', 2, '热爱技术', '1583741285@qq.com');
INSERT INTO `t_student` VALUES (20170105, '12345', '马张立', '18728112986', '男', '1992-07-24', 3, '热爱技术', '1583741285@qq.com');
INSERT INTO `t_student` VALUES (20170106, '2222', 'zc', '12312213', '男', '2019-12-22T16:00:00.000Z', 1, '1231221312312213123122131231221312312213', '1583741285@qq.com');

-- ----------------------------
-- Table structure for t_student_course
-- ----------------------------
DROP TABLE IF EXISTS `t_student_course`;
CREATE TABLE `t_student_course`  (
  `sno` int(100) NOT NULL,
  `cno` int(100) NOT NULL,
  PRIMARY KEY (`sno`, `cno`) USING BTREE,
  INDEX `t_student_course_ibfk_2`(`cno`) USING BTREE,
  CONSTRAINT `t_student_course_ibfk_1` FOREIGN KEY (`sno`) REFERENCES `t_student` (`sno`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `t_student_course_ibfk_2` FOREIGN KEY (`cno`) REFERENCES `t_course` (`cno`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_student_course
-- ----------------------------
INSERT INTO `t_student_course` VALUES (20170101, 1);
INSERT INTO `t_student_course` VALUES (20170101, 2);
INSERT INTO `t_student_course` VALUES (20170101, 3);

-- ----------------------------
-- Table structure for t_teacher
-- ----------------------------
DROP TABLE IF EXISTS `t_teacher`;
CREATE TABLE `t_teacher`  (
  `tno` int(11) NOT NULL AUTO_INCREMENT,
  `loginname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tname` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pwd` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `hiredate` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `remark` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`tno`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_teacher
-- ----------------------------
INSERT INTO `t_teacher` VALUES (1, ' jack', '王希文', '12345', '11136172228', '2018-02-01 00:00:00', '1高级程序员转老师', '1583741285@qq.com');
INSERT INTO `t_teacher` VALUES (2, 'liuyu', '刘宇', '12345', '15623477374', '2017-10-24 00:00:00', '高级java工程师', '1583741285@qq.com');
INSERT INTO `t_teacher` VALUES (3, 'machao', '马超', '12345', '18212734776', '2017-12-10 00:00:00', '高级java项目经理', '1583741285@qq.com');
INSERT INTO `t_teacher` VALUES (4, 'mike', '闫立忠', '12345', '13918283488', '2016-11-22 00:00:00', '高级java工程师', '1583741285@qq.com');
INSERT INTO `t_teacher` VALUES (5, 'qison', '王业启', '110110', '13163304417', '2019-12-27T16:00:00.000Z', '王业启喜欢女装，还喜欢唱跳rap。。。。。。。。。。。。。。。。。。。。。。。', '110@qq.com');
INSERT INTO `t_teacher` VALUES (6, 'zc', '李二傻', '111', '123123213', '2019-12-23T16:00:00.000Z', '1wqeqweqwe21321312321312321', '1583741285@qq.com');
INSERT INTO `t_teacher` VALUES (7, 'zaaaa', 'zc', '111', '213213213213', '2019-12-23T16:00:00.000Z', '1583741285@qq.com1583741285@qq.com1583741285@qq.com', '1583741285@qq.com');
INSERT INTO `t_teacher` VALUES (10, '15837412', '1583', '1583741285@qq.com', '1583741285@qq.com', '2019-12-30T16:00:00.000Z', '2131232131583741285@qq.com', '1583741285@qq.com');
INSERT INTO `t_teacher` VALUES (11, '15837412', '1583', '1583741285@qq.com', '1583741285@qq.com', '2019-12-25T16:00:00.000Z', '1583741285@qq.com1583741285@qq.com1583741285@qq.com1583741285@qq.com', '1583741285@qq.com');

SET FOREIGN_KEY_CHECKS = 1;

/*
 Navicat Premium Data Transfer

 Source Server         : MyDatabase
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : cloudserver

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 28/02/2024 15:36:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_info
-- ----------------------------
DROP TABLE IF EXISTS `admin_info`;
CREATE TABLE `admin_info`  (
  `displayid` int NOT NULL AUTO_INCREMENT,
  `relation_uid` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `workplace` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `intro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `relation_groupid` int NULL DEFAULT NULL,
  PRIMARY KEY (`displayid`) USING BTREE,
  INDEX `relation_uid`(`relation_uid`) USING BTREE,
  INDEX `relation_groupid`(`relation_groupid`) USING BTREE,
  CONSTRAINT `admin_info_ibfk_2` FOREIGN KEY (`relation_groupid`) REFERENCES `usergroup` (`groupid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `admin_info_ibfk_3` FOREIGN KEY (`relation_uid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for character
-- ----------------------------
DROP TABLE IF EXISTS `character`;
CREATE TABLE `character`  (
  `characterid` int NOT NULL,
  `charactername` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`characterid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for conversation
-- ----------------------------
DROP TABLE IF EXISTS `conversation`;
CREATE TABLE `conversation`  (
  `convid` int NOT NULL,
  `relation_orderid` int NULL DEFAULT NULL,
  `talk_user1id` int NULL DEFAULT NULL,
  `talk_user2id` int NULL DEFAULT NULL,
  PRIMARY KEY (`convid`) USING BTREE,
  INDEX `relation_orderid`(`relation_orderid`) USING BTREE,
  INDEX `talk_user1id`(`talk_user1id`) USING BTREE,
  INDEX `talk_user2id`(`talk_user2id`) USING BTREE,
  CONSTRAINT `conversation_ibfk_1` FOREIGN KEY (`relation_orderid`) REFERENCES `order` (`orderid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `conversation_ibfk_2` FOREIGN KEY (`talk_user1id`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `conversation_ibfk_3` FOREIGN KEY (`talk_user2id`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for default_requirement
-- ----------------------------
DROP TABLE IF EXISTS `default_requirement`;
CREATE TABLE `default_requirement`  (
  `displayid` int NOT NULL AUTO_INCREMENT,
  `relation_productid` int NOT NULL,
  `relation_doctorid` int NULL DEFAULT NULL,
  `relation_categoryid` int NULL DEFAULT NULL,
  `require_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`displayid`) USING BTREE,
  INDEX `relation_productid`(`relation_productid`) USING BTREE,
  INDEX `relation_categoryid`(`relation_categoryid`) USING BTREE,
  INDEX `relation_doctorid`(`relation_doctorid`) USING BTREE,
  CONSTRAINT `default_requirement_ibfk_1` FOREIGN KEY (`relation_productid`) REFERENCES `product` (`product_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `default_requirement_ibfk_3` FOREIGN KEY (`relation_categoryid`) REFERENCES `require_category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `default_requirement_ibfk_4` FOREIGN KEY (`relation_doctorid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for doc_org_relation
-- ----------------------------
DROP TABLE IF EXISTS `doc_org_relation`;
CREATE TABLE `doc_org_relation`  (
  `displayid` int NOT NULL AUTO_INCREMENT,
  `doctor_uid` int NULL DEFAULT NULL,
  `relation_orgid` int NULL DEFAULT NULL,
  PRIMARY KEY (`displayid`) USING BTREE,
  INDEX `relation_orgid`(`relation_orgid`) USING BTREE,
  INDEX `doctor_uid`(`doctor_uid`) USING BTREE,
  CONSTRAINT `doc_org_relation_ibfk_2` FOREIGN KEY (`relation_orgid`) REFERENCES `organization` (`orgid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `doc_org_relation_ibfk_3` FOREIGN KEY (`doctor_uid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for doctor_info
-- ----------------------------
DROP TABLE IF EXISTS `doctor_info`;
CREATE TABLE `doctor_info`  (
  `displayid` int NOT NULL AUTO_INCREMENT,
  `relation_uid` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `workplace` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `intro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `relation_groupid` int NULL DEFAULT NULL,
  PRIMARY KEY (`displayid`) USING BTREE,
  INDEX `relation_groupid`(`relation_groupid`) USING BTREE,
  INDEX `relation_uid`(`relation_uid`) USING BTREE,
  CONSTRAINT `doctor_info_ibfk_2` FOREIGN KEY (`relation_groupid`) REFERENCES `usergroup` (`groupid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `doctor_info_ibfk_3` FOREIGN KEY (`relation_uid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for employee_info
-- ----------------------------
DROP TABLE IF EXISTS `employee_info`;
CREATE TABLE `employee_info`  (
  `displayid` int NOT NULL AUTO_INCREMENT,
  `relation_uid` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `workplace` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `intro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `relation_groupid` int NULL DEFAULT NULL,
  PRIMARY KEY (`displayid`) USING BTREE,
  INDEX `relation_uid`(`relation_uid`) USING BTREE,
  INDEX `relation_groupid`(`relation_groupid`) USING BTREE,
  CONSTRAINT `employee_info_ibfk_2` FOREIGN KEY (`relation_groupid`) REFERENCES `usergroup` (`groupid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `employee_info_ibfk_3` FOREIGN KEY (`relation_uid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for material
-- ----------------------------
DROP TABLE IF EXISTS `material`;
CREATE TABLE `material`  (
  `material_id` int NOT NULL,
  `material_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`material_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `msgid` int NOT NULL,
  `relation_convid` int NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT NULL,
  `whosend_uid` int NULL DEFAULT NULL,
  PRIMARY KEY (`msgid`) USING BTREE,
  INDEX `relation_convid`(`relation_convid`) USING BTREE,
  INDEX `whosend_uid`(`whosend_uid`) USING BTREE,
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`relation_convid`) REFERENCES `conversation` (`convid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`whosend_uid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `orderid` int NOT NULL,
  `ordernumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `petient_uid` int NULL DEFAULT NULL,
  `relation_orgid` int NULL DEFAULT NULL,
  `doctor_uid` int NULL DEFAULT NULL,
  PRIMARY KEY (`orderid`) USING BTREE,
  INDEX `relation_orgid`(`relation_orgid`) USING BTREE,
  INDEX `petient_uid`(`petient_uid`) USING BTREE,
  INDEX `doctor_uid`(`doctor_uid`) USING BTREE,
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`relation_orgid`) REFERENCES `organization` (`orgid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_ibfk_3` FOREIGN KEY (`petient_uid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_ibfk_4` FOREIGN KEY (`doctor_uid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for orderproduct
-- ----------------------------
DROP TABLE IF EXISTS `orderproduct`;
CREATE TABLE `orderproduct`  (
  `orderproduct_id` int NOT NULL,
  `relation_productid` int NULL DEFAULT NULL,
  `relation_orderid` int NULL DEFAULT NULL,
  PRIMARY KEY (`orderproduct_id`) USING BTREE,
  INDEX `relation_productid`(`relation_productid`) USING BTREE,
  INDEX `relation_orderid`(`relation_orderid`) USING BTREE,
  CONSTRAINT `orderproduct_ibfk_1` FOREIGN KEY (`relation_productid`) REFERENCES `product` (`product_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orderproduct_ibfk_2` FOREIGN KEY (`relation_orderid`) REFERENCES `order` (`orderid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for organization
-- ----------------------------
DROP TABLE IF EXISTS `organization`;
CREATE TABLE `organization`  (
  `orgid` int NOT NULL,
  `orgname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `orgdescription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`orgid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for patient_info
-- ----------------------------
DROP TABLE IF EXISTS `patient_info`;
CREATE TABLE `patient_info`  (
  `displayid` int NOT NULL AUTO_INCREMENT,
  `relation_uid` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `workplace` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `intro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `relation_groupid` int NULL DEFAULT NULL,
  `relation_orgid` int NULL DEFAULT NULL,
  PRIMARY KEY (`displayid`) USING BTREE,
  INDEX `relation_uid`(`relation_uid`) USING BTREE,
  INDEX `relation_groupid`(`relation_groupid`) USING BTREE,
  INDEX `relation_orgid`(`relation_orgid`) USING BTREE,
  CONSTRAINT `patient_info_ibfk_2` FOREIGN KEY (`relation_groupid`) REFERENCES `usergroup` (`groupid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `patient_info_ibfk_3` FOREIGN KEY (`relation_orgid`) REFERENCES `organization` (`orgid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `patient_info_ibfk_4` FOREIGN KEY (`relation_uid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for proc_emp_relation
-- ----------------------------
DROP TABLE IF EXISTS `proc_emp_relation`;
CREATE TABLE `proc_emp_relation`  (
  `displayid` int NOT NULL AUTO_INCREMENT,
  `relation_processid` int NOT NULL,
  `relation_employeeid` int NULL DEFAULT NULL,
  PRIMARY KEY (`displayid`) USING BTREE,
  INDEX `relation_processid`(`relation_processid`) USING BTREE,
  INDEX `relation_employeeid`(`relation_employeeid`) USING BTREE,
  CONSTRAINT `proc_emp_relation_ibfk_1` FOREIGN KEY (`relation_processid`) REFERENCES `process` (`process_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `proc_emp_relation_ibfk_2` FOREIGN KEY (`relation_employeeid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for proc_prod_relation
-- ----------------------------
DROP TABLE IF EXISTS `proc_prod_relation`;
CREATE TABLE `proc_prod_relation`  (
  `displayid` int NOT NULL AUTO_INCREMENT,
  `relation_processid` int NOT NULL,
  `relation_productid` int NULL DEFAULT NULL,
  PRIMARY KEY (`displayid`) USING BTREE,
  INDEX `relation_processid`(`relation_processid`) USING BTREE,
  INDEX `relation_productid`(`relation_productid`) USING BTREE,
  CONSTRAINT `proc_prod_relation_ibfk_1` FOREIGN KEY (`relation_processid`) REFERENCES `process` (`process_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `proc_prod_relation_ibfk_2` FOREIGN KEY (`relation_productid`) REFERENCES `product` (`product_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for process
-- ----------------------------
DROP TABLE IF EXISTS `process`;
CREATE TABLE `process`  (
  `process_id` int NOT NULL,
  `process_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`process_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `product_id` int NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `relation_mid` int NULL DEFAULT NULL,
  `relation_vid` int NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`) USING BTREE,
  INDEX `relation_mid`(`relation_mid`) USING BTREE,
  INDEX `relation_vid`(`relation_vid`) USING BTREE,
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`relation_mid`) REFERENCES `material` (`material_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`relation_vid`) REFERENCES `variety` (`variety_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for require_category
-- ----------------------------
DROP TABLE IF EXISTS `require_category`;
CREATE TABLE `require_category`  (
  `category_id` int NOT NULL,
  `relation_productid` int NULL DEFAULT NULL,
  `category_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`category_id`) USING BTREE,
  INDEX `relation_productid`(`relation_productid`) USING BTREE,
  CONSTRAINT `require_category_ibfk_1` FOREIGN KEY (`relation_productid`) REFERENCES `product` (`product_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for requirement
-- ----------------------------
DROP TABLE IF EXISTS `requirement`;
CREATE TABLE `requirement`  (
  `displayid` int NOT NULL AUTO_INCREMENT,
  `relation_orderproductid` int NOT NULL,
  `relation_categoryid` int NULL DEFAULT NULL,
  `require_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`displayid`) USING BTREE,
  INDEX `relation_orderproductid`(`relation_orderproductid`) USING BTREE,
  INDEX `relation_categoryid`(`relation_categoryid`) USING BTREE,
  CONSTRAINT `requirement_ibfk_1` FOREIGN KEY (`relation_orderproductid`) REFERENCES `orderproduct` (`orderproduct_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `requirement_ibfk_2` FOREIGN KEY (`relation_categoryid`) REFERENCES `require_category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uid` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `relation_characterid` int NULL DEFAULT NULL COMMENT '外键',
  PRIMARY KEY (`uid`) USING BTREE,
  INDEX `relation_characterid`(`relation_characterid`) USING BTREE,
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`relation_characterid`) REFERENCES `character` (`characterid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 123461 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for usergroup
-- ----------------------------
DROP TABLE IF EXISTS `usergroup`;
CREATE TABLE `usergroup`  (
  `groupid` int NOT NULL,
  `groupname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `groupdescription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createtime` datetime(0) NULL DEFAULT NULL,
  `parentgroupid` int NULL DEFAULT NULL,
  PRIMARY KEY (`groupid`) USING BTREE,
  INDEX `parentgroupid`(`parentgroupid`) USING BTREE,
  CONSTRAINT `usergroup_ibfk_1` FOREIGN KEY (`parentgroupid`) REFERENCES `usergroup` (`groupid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for variety
-- ----------------------------
DROP TABLE IF EXISTS `variety`;
CREATE TABLE `variety`  (
  `variety_id` int NOT NULL,
  `variety_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`variety_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for workorder
-- ----------------------------
DROP TABLE IF EXISTS `workorder`;
CREATE TABLE `workorder`  (
  `workorder_id` int NOT NULL,
  `workorder_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `relation_orderproductid` int NULL DEFAULT NULL,
  PRIMARY KEY (`workorder_id`) USING BTREE,
  INDEX `relation_orderproductid`(`relation_orderproductid`) USING BTREE,
  CONSTRAINT `workorder_ibfk_1` FOREIGN KEY (`relation_orderproductid`) REFERENCES `orderproduct` (`orderproduct_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

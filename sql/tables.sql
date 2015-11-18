CREATE TABLE  user
(
Id int NOT NULL auto_increment primary key,
username VARCHAR(30) NOT NULL,
password VARCHAR(100) NOT NULL,
role VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS `post` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(100) NOT NULL,
  `content` text,
  `user_Id` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `host` varchar(35) DEFAULT NULL,
  `vote_up` int(11) DEFAULT NULL,
  `vote_down` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
   KEY `user_Id` (`user_Id`)

);

CREATE TABLE IF NOT EXISTS `vote` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `update_id` int(11) NOT NULL,
  `vote_host` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `update_id` (`update_id`)
);
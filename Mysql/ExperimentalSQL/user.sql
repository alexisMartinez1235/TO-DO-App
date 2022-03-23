drop table `User`;
CREATE TABLE `USER`(
	id VARCHAR(36) NOT NULL,
	email VARCHAR(30) primary key NOT NULL,
	`password` VARCHAR(60) NOT NULL
);
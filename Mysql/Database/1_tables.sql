USE db_todo;

CREATE TABLE TASK(
  id CHAR(9) NOT NULL,
  `description` VARCHAR(20) NOT NULL,
  expirationDate DATE,
  activated BOOLEAN DEFAULT TRUE,
  CONSTRAINT RESTR_ID PRIMARY KEY(id)
);

CREATE TABLE `USER`(
  id VARCHAR(36) NOT NULL,
  email VARCHAR(30) primary key NOT NULL,
  `password` VARCHAR(60) NOT NULL
);

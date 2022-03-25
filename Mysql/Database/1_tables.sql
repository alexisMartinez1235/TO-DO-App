USE db_todo;

CREATE TABLE PERSON(
  id VARCHAR(36) NOT NULL,
  email VARCHAR(30) primary key NOT NULL,
  `password` VARCHAR(60) NOT NULL
);

CREATE TABLE TASK(
  id CHAR(9) primary key NOT NULL,
  `description` VARCHAR(20) NOT NULL,
  expirationDate DATE,
  activated BOOLEAN DEFAULT TRUE,
  email VARCHAR(30) NOT NULL,
  FOREIGN KEY (email) REFERENCES PERSON(email)
);


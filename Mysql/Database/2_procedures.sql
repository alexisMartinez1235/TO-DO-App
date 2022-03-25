USE db_todo;

CREATE PROCEDURE INSERT_TASK(
  IN _id CHAR(9),
  IN _description CHAR(20),
  IN _expirationDate DATE,
  IN _email VARCHAR(30)
) INSERT INTO 
    TASK (id, `description`, expirationDate, email)
  VALUES
    (_id, _description, _expirationDate, _email);

CREATE PROCEDURE LOGICAL_DELETE_TASK(
  IN _id CHAR(9),
  IN _email VARCHAR(30)
) UPDATE TASK SET activated=FALSE WHERE id = _id AND email = _email;


CREATE PROCEDURE PHYSICAL_DELETE_TASK(
  IN _id CHAR(9)
) DELETE FROM TASK WHERE id = _id AND email = _email;

USE db_todo;

CREATE PROCEDURE INSERT_TASK(
  IN _description CHAR(20),
  IN _expirationDate DATE
) INSERT INTO 
    TASK (`description`, expirationDate)
  VALUES
    (_description, _expirationDate);

CREATE PROCEDURE LOGICAL_DELETE_TASK(
  IN _id INT(4)
) UPDATE TASK SET activated=FALSE WHERE id = _ID;


CREATE PROCEDURE PHYSICAL_DELETE_TASK(
  IN _id INT(4)
) DELETE FROM TASK WHERE id = _id;

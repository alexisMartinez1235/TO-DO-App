USE db_todo;

CREATE PROCEDURE INSERT_TASK(
  IN _id CHAR(9),
  IN _description CHAR(20),
  IN _expirationDate DATE
) INSERT INTO 
    TASK (id, `description`, expirationDate)
  VALUES
    (_id, _description, str_to_date(_expirationDate, '%Y-%m-%dT%H:%i:%s.%fZ'));

CREATE PROCEDURE LOGICAL_DELETE_TASK(
  IN _id CHAR(9)
) UPDATE TASK SET activated=0 WHERE id = _id;


CREATE PROCEDURE PHYSICAL_DELETE_TASK(
  IN _id CHAR(9)
) DELETE FROM TASK WHERE id = _id;

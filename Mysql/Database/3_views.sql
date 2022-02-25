USE db_todo;
CREATE VIEW vTask
AS(
  SELECT id, `description`,
        DATE_FORMAT(expirationDate, '%a %b %c %Y %H:%i:%s') as expirationDate,
    activated
  FROM TASK
  WHERE activated=1
);

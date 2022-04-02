use db_todo;
SELECT idList, listName, inTrash, emailPerson, isOwner, canRead, canWrite, canUse
FROM `list`
FULL JOIN `PERSON_HAS_LIST`
ON  id = `PERSON_HAS_LIST`.idList
WHERE emailPerson='John@mymail.com';
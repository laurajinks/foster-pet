SELECT * FROM animal
WHERE user_id = $1
ORDER BY animal.name ASC;
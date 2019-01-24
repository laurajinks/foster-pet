SELECT * FROM animal
LEFT JOIN users ON animal.user_id = users.user_id
WHERE animal.org_id = $1 AND animal.active = true
ORDER BY animal.name ASC;
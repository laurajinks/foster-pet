SELECT * FROM animal
LEFT JOIN users ON animal.user_id = users.user_id
AND animal.org_id = $1;
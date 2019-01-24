SELECT COUNT (*) FROM animal
WHERE user_id = $1 AND active = false;
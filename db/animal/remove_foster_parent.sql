UPDATE animal
SET user_id = NULL
WHERE animal_id = $1;
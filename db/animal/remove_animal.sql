UPDATE animal
SET active = false
WHERE animal_id = $1;
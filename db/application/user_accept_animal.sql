DELETE FROM pending_animal
WHERE animal_id = $1;

UPDATE animal
SET user_id = $2
WHERE animal_id = $1;
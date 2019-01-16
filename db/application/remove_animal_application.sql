DELETE FROM pending_animal
WHERE animal_id = $1 AND user_id = $2;
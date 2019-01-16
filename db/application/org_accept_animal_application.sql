UPDATE pending_animal
SET org_accept = true
WHERE animal_id = $1;
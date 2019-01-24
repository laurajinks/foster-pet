SELECT * FROM pending_animal
LEFT JOIN animal ON animal.animal_id = pending_animal.animal_id
LEFT JOIN organization ON animal.org_id = organization.org_id
WHERE pending_animal.user_id = $1
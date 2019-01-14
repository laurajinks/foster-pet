INSERT INTO animal
(org_id, name, animal_type, age, sex, breed, size, description, img)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning *;
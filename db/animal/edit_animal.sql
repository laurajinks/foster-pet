UPDATE animal
SET name = $2, animal_type = $3, age = $4, sex = $5, breed = $6, size =$7, description = $8
WHERE animal_id = $1

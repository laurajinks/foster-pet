SELECT * FROM animal
LEFT JOIN organization ON organization.org_id = animal.org_id
WHERE user_id = $1
ORDER BY animal.name ASC;
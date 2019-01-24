SELECT * FROM member
LEFT JOIN animal ON animal.org_id = member.org_id
WHERE member.user_id = $1 AND animal.user_id IS NULL AND animal.active = true
ORDER BY animal.name ASC;
SELECT * FROM member
LEFT JOIN users ON users.user_id = member.user_id
WHERE member.org_id = $1;
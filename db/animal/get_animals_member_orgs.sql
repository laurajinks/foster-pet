SELECT * FROM member
LEFT JOIN animal ON animal.org_id = member.org_id
AND member.user_id = $1;
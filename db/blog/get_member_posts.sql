SELECT * FROM member
LEFT JOIN post ON post.org_id = member.org_id
WHERE member.user_id = $1;
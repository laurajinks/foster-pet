SELECT * FROM member
LEFT JOIN post ON post.org_id = member.org_id
LEFT JOIN organization ON organization.org_id = post.org_id
WHERE member.user_id = $1
ORDER BY post.post_id DESC;
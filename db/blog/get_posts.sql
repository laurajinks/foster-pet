SELECT * FROM post
LEFT JOIN organization ON post.org_id = organization.org_id
WHERE post.org_id = $1
ORDER BY post.post_id DESC;
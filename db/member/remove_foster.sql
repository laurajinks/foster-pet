DELETE FROM member
WHERE org_id = $1 AND user_id = $2;
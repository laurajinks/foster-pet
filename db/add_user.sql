INSERT INTO users
(username, user_display_name, auth_id, email, img)
VALUES
($1, $2, $3, $4, $5)
returning *;
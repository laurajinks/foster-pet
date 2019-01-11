INSERT INTO users
(username, user_display_name, auth_id, email)
VALUES
($1, $2, $3, $4)
returning *;
INSERT INTO organization
(username, org_display_name, auth_id, email, zipcode)
VALUES
($1, $2, $3, $4, $5)
returning *;
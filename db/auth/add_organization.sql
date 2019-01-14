INSERT INTO organization
(username, org_display_name, auth_id, email, zipcode, img)
VALUES
($1, $2, $3, $4, $5, $6)
returning *;
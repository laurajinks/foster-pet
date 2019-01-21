INSERT INTO organization
(username, org_display_name, auth_id, email, zipcode, us_state, img)
VALUES
($1, $2, $3, $4, $5, $6, $7)
returning *;
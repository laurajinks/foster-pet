UPDATE organization
SET org_display_name = $2, email = $3, org_bio = $4
WHERE org_id = $1
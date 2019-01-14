UPDATE organization
SET application = $2
WHERE org_id = $1;

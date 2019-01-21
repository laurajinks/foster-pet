SELECT * FROM organization
WHERE us_state = $1
ORDER BY org_display_name ASC;
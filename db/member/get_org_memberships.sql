SELECT org_display_name from organization
LEFT JOIN member ON member.org_id = organization.org_id
WHERE member.user_id = $1;
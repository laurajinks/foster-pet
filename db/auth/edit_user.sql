UPDATE users
SET user_display_name = $2, email = $3, user_bio = $4, img = $5
WHERE user_id = $1
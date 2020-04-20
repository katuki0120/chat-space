json.user_name @message.user.name
json.content @message.content
json.image @message.image_url
json.time @message.created_at.to_s(:default)
json.id @message.id
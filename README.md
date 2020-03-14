# Chatspaceの設計

## usersテーブル
|Column|Type|Options|
|:------:|:----:|:-------:|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
|groups_id|integer|null: false, foreign_key: true|
### Association
- has_many :groups, through:  :users_groups
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|:------:|:----:|:-------:|
|group_name|string|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :users, through:  :users_groups
- has_many :messages

## posts_tagsテーブル
|Column|Type|Options|
|:------:|:----:|:-------:|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|:------:|:----:|:-------:|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|text|text|null: false|
|image|string||
### Association
- belongs_to :user
- belongs_to :group




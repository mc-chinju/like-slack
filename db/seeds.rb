# TODO: リリース前には削除
# development のテスト用データ

# user の作成
owner = User.create!(
  login: "owner",
  email: "owner@nigekiri.com",
  password: "owner12345"
)
general = User.create!(
  login: "general",
  email: "general@nigekiri.com",
  password: "general12345"
)

# チームの作成, メンバーの追加
enterprise = owner.enterprises.create!(name: "人生逃げ切りサロン", account_name: "nigekiri")
owner_account   = enterprise.accounts.find_by(enterprise: enterprise)
general_account = enterprise.accounts.create!(user: general)

# チャンネルとメッセージの追加
channel = enterprise.channels.create!(
  name: "てすとちゃんねる",
  owner_id: owner_account.id
)
message = channel.messages.create!(
  body: "Hello!",
  account: owner_account
)

message = ChannelMember.create!(
  account_id: 1,
  channel_id: 1
)

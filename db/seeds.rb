#TODO: リリース前には削除

User.delete_all
Account.delete_all
Enterprise.delete_all
Channel.delete_all

owner = User.create!(login:'owhoge',email:'owner@hoge.com', password:'hugahuga')

user = User.create!(login:'hoge',email:'hogehoge@hoge.com',password:'hugahuga')

enterprise = Enterprise.create!(name:'nigekiri',account_name:'逃げ切り')

account1 = Account.create!(user_id:owner.id,enterprise_id:enterprise.id)

Account.create!(user_id:user.id,enterprise_id:enterprise.id)

channel1 = Channel.create!(
  enterprise_id:enterprise.id,
  owner_id:owner.id,
  name:'test_channel',
  user_id:user.id
)

Message.create!(
  :body => 'Hello!',
  :channel_id => channel1.id,
  :account_id => account1.id,
  :user_id => owner.id
)

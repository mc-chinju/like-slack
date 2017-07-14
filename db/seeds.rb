User.delete_all
Account.delete_all
Enterprise.delete_all
Channel.delete_all

owner = User.new(:login => 'owhoge',:email => 'owner@hoge.com', :password => 'hugahuga')
owner.save!

user = User.new(:login => 'hoge',:email => 'hogehoge@hoge.com', :password => 'hugahuga')
user.save!

enterprise = Enterprise.new(
  :name => 'nigekiri', :account_name => '逃げ切り'
)
enterprise.save!

account1 = Account.new(
  :user_id => owner.id,:enterprise_id => enterprise.id
)
account1.save!

Account.create!(
  :user_id => user.id,:enterprise_id => enterprise.id
)

channel1 = Channel.new(
  :enterprise_id => enterprise.id,
  :owner_id => owner.id,
  :name => 'test_channel',
  :user_id => user.id
)
channel1.save!

Message.create!(
  :body => 'Hello!',
  :channel_id => channel1.id,
  :account_id => account1.id,
  :user_id => owner.id
)

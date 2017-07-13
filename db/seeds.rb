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

Account.create!(
  :user_id => owner.id,:enterprise_id => enterprise.id
)
Account.create!(
  :user_id => user.id,:enterprise_id => enterprise.id
)

Channel.create!(
  :enterprise_id => enterprise.id,
  :owner_id => owner.id,
  :name => 'test_channel',
  :user_id => user.id
)

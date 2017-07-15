describe "Channels API", type: :request do
  describe "GET /channels" do
    context "チャンネル一覧を取得" do
      context "ログインアカウントに紐づくチャンネル一覧を取得するとき" do
        subject { get "/channels" }

        before {
          channels = create_list(:channel, 4, enterprise: current_enterprise, owner_id: current_account.id)
          channels.each do |channel|
            create(:channel_member, channel: channel, account: current_account)
          end
        }

        fit "成功する" do
          expect(subject).to eq 200
          parsed_body = response.parsed_body
          binding.pry
          expect(parsed_body.count).to eq 5
        end
      end
    end
  end
end
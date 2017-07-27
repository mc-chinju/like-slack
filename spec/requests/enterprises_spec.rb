describe "Enterprises API", type: :request do
  describe "GET /enterprises" do
    context "チーム一覧を取得" do
      context "ログインユーザーに紐付くチームを取得するとき" do
        subject { get "/enterprises" }

        before {
          create_list(:account, 4, :with_user, :with_enterprise, user: current_user)
        }

        it "成功する" do
          expect(subject).to eq 200
          parsed_body = response.parsed_body
          expect(parsed_body.count).to eq 5
        end
      end
    end
  end

  describe "POST /enterprises" do
    context "新しいチームを作成" do
      context "自身が所属する新規チームを作成するとき" do
        subject { post "/enterprises", @params }

        before {
          @attributes = attributes_for(:enterprise)
          @params = { enterprise: @attributes }
        }

        it "成功する" do
          expect(subject).to eq 200
          parsed_body = response.parsed_body
          aggregate_failures do
            expect(parsed_body["name"]).to eq @attributes[:name]
            expect(parsed_body["account_name"]).to eq @attributes[:account_name]
          end
        end
      end
    end
  end
end

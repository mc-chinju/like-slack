require 'test_helper'

class EnterprisesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @enterprise = enterprises(:one)
  end

  test "should get index" do
    get enterprises_url
    assert_response :success
  end

  test "should get new" do
    get new_enterprise_url
    assert_response :success
  end

  test "should create enterprise" do
    assert_difference('Enterprise.count') do
      post enterprises_url, params: { enterprise: { account_name: @enterprise.account_name } }
    end

    assert_redirected_to enterprise_url(Enterprise.last)
  end

  test "should show enterprise" do
    get enterprise_url(@enterprise)
    assert_response :success
  end

  test "should get edit" do
    get edit_enterprise_url(@enterprise)
    assert_response :success
  end

  test "should update enterprise" do
    patch enterprise_url(@enterprise), params: { enterprise: { account_name: @enterprise.account_name } }
    assert_redirected_to enterprise_url(@enterprise)
  end

  test "should destroy enterprise" do
    assert_difference('Enterprise.count', -1) do
      delete enterprise_url(@enterprise)
    end

    assert_redirected_to enterprises_url
  end
end

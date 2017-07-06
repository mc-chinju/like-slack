class EnterprisesController < ApplicationController
  before_action :set_enterprise, only: [:show, :edit, :update, :destroy]

  # GET /enterprises
  # GET /enterprises.json
  def index
    @enterprises = Enterprise.all
  end

  # GET /enterprises/1
  # GET /enterprises/1.json
  def show
  end

  # GET /enterprises/new
  def new
    @enterprise = Enterprise.new
  end

  # GET /enterprises/1/edit
  def edit
  end

  # POST /enterprises
  # POST /enterprises.json
  def create
    @enterprise = Enterprise.new(enterprise_params)

    respond_to do |format|
      if @enterprise.save
        format.html { redirect_to @enterprise, notice: 'Enterprise was successfully created.' }
        format.json { render :show, status: :created, location: @enterprise }
      else
        format.html { render :new }
        format.json { render json: @enterprise.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /enterprises/1
  # PATCH/PUT /enterprises/1.json
  def update
    respond_to do |format|
      if @enterprise.update(enterprise_params)
        format.html { redirect_to @enterprise, notice: 'Enterprise was successfully updated.' }
        format.json { render :show, status: :ok, location: @enterprise }
      else
        format.html { render :edit }
        format.json { render json: @enterprise.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /enterprises/1
  # DELETE /enterprises/1.json
  def destroy
    @enterprise.destroy
    respond_to do |format|
      format.html { redirect_to enterprises_url, notice: 'Enterprise was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_enterprise
      @enterprise = Enterprise.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def enterprise_params
      params.require(:enterprise).permit(:account_name)
    end
end

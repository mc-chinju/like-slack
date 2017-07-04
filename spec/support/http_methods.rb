module HttpMethods
  def get(url, params=nil, header={})
    super url, params: params, headers: header.merge(default_header)
  end

  def post(url, params=nil, header={})
    if params.key? :files
      super url, params: params, headers: header.merge(upload_header)
    else
      super url, params: params.try(:to_json), headers: header.merge(default_header)
    end
  end

  def put(url, params=nil, header={})
    super url, params: params.try(:to_json), headers: header.merge(default_header)
  end

  def patch(url, params=nil, header={})
    super url, params: params.try(:to_json), headers: header.merge(default_header)
  end

  def delete(url, params=nil, header={})
    super url, params: params, headers: header.merge(default_header)
  end
end

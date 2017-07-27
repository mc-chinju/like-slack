require 'mail'

class String
  def with_4bytes?
    /[\u{10000}-\u{10ffff}]/ === self
  end

  def valid_email?
    m = Mail::Address.new self
    return false unless m.domain && m.address == self
    return false if m.address =~ /\.\.|__|^\W|\W@/
    return false unless (m.domain.split(?.).size > 1)
    true
  end
end
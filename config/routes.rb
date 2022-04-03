Rails.application.routes.draw do
  get 'gia/disasm'
  get 'gia/version'
  root "gia#index"
end

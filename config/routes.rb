Rails.application.routes.draw do
  get 'gia/disasm'
  root "gia#index"
end

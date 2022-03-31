class GiaController < ApplicationController
  def disasm
    input = params[:description]
    begin
      insns = RubyVM::InstructionSequence.compile(input).disasm
      some_text = {
        success: true,
        disasmText: insns
      }
      render :json => some_text
    rescue Exception => ex
      some_text = {
        success: false,
        disasmText: ex
      }
      render :json => some_text
    end
  end
end

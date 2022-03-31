import * as React from 'react'                          
import * as ReactDOM from 'react-dom'      
                                                        
class Hello extends React.Component {
  constructor() {
    super();
    console.log("Component constructor has executed")

    this.state = {
      rubyText: "",
      disasmText: "",
      optimizations: {
        inline_const_cache: false,
        instructions_unification: false,
        peephole_optimization: false,
        specialized_instruction: false,
        stack_caching: false,
        tailcall_optimization: false
      }
    }
  }

  updateDisasm(currentRubyText, currentOptimization) {
    const url = "/gia/disasm?description=" +
      encodeURIComponent(currentRubyText) + 
      "&optimizations=" + 
      encodeURIComponent(Object.keys(currentOptimization).map(ob => ob + ":" + currentOptimization[ob]).join(','));
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ disasmText: response.disasmText }))
  }

  handleRubyTextChange = (e) => {
    this.setState({rubyText: e.target.value});
    this.updateDisasm(e.target.value, this.state.optimizations);
  }

  handleCheckbox = (e) => {
    let tempOptimizations = this.state.optimizations;
    tempOptimizations[e.target.name] = e.target.checked;
    this.setState({optimizations: tempOptimizations})
    this.updateDisasm(this.state.rubyText, tempOptimizations);
  }

  

  render () {
    return (
      <div id="full_view_container">
        <div id="ide_container">
          <h1 id="title_container">Shipley's Gia Inspect</h1>
          <div class="text_form_box_container">
            <textarea class="text_form_box" id="myform_inputbox" value={this.state.rubyText} onChange={this.handleRubyTextChange}/>
            <textarea class="text_form_box" id="disasm_box" value={this.state.disasmText}/>
          </div>
        </div>
        <div id="compiler_options_container_container">
          <div id="compiler_options_container">
            <h3>Compiler Options: </h3>
            {
              Object.keys(this.state.optimizations).map(optimizationName => {
                return <div class="compiler_option">
                  <input type="checkbox" name={optimizationName} value={optimizationName} onChange={this.handleCheckbox} checked={this.state.optimizations[optimizationName]}/> {optimizationName}
                </div>
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Hello

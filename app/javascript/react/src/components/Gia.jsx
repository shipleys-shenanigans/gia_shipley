import * as React from 'react'                          
import * as ReactDOM from 'react-dom'      
                                                        
class Hello extends React.Component {
  constructor() {
    super();
    console.log("Component constructor has executed")

    this.state = {
      rubyText: "",
      disasmText: ""
    }
  }

  handleRubyTextChange = (e) => {
    this.setState({rubyText: e.target.value});
    const url = "/gia/disasm?description=" + encodeURIComponent(e.target.value);
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ disasmText: response.disasmText }))
  }


  render () {
    return (
      <div id="ide_container">
        <h1 id="title_container">Shipley's Gia Inspect</h1>
        <div class="text_form_box_container">
          <textarea class="text_form_box" id="myform_inputbox" value={this.state.rubyText} onChange={this.handleRubyTextChange}/>
          <textarea class="text_form_box" id="disasm_box" value={this.state.disasmText}/>
        </div>
    </div>
    );
  }
}

export default Hello

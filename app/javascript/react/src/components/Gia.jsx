import * as React from 'react'                          
import * as ReactDOM from 'react-dom'      
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-ruby";
import "prismjs/themes/prism.css"; //Example style, you can use another

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

  // This (and accompanying css) copy-pasta from:
  //    https://codesandbox.io/s/react-simple-editor-linenumbers-wy240?from-embed=&file=/src/index.js:867-919
  hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");

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
    this.setState({rubyText: e});
    this.updateDisasm(e, this.state.optimizations);
  }

  handleEditorStateChange = (editorState) => {
    this.setState({editorState})
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
            <div className="text_form_box" id="myform_inputbox">
              {/* <Editor  editorState={this.state.editorState} onChange={this.handleEditorStateChange}/> */}
             <Editor
              value={this.state.rubyText}
              onValueChange={this.handleRubyTextChange}
              highlight={(code) => this.hightlightWithLineNumbers(code, languages.rb)}
              padding={10}
              textareaId="codeArea"
              className="editor"
            />
            </div>
            {/* <Editor editorState={this.state.editorState} onChange={this.handleEditorStateChange}/> */}
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

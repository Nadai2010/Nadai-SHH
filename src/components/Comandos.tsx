import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import './Comandos.css';

const Comandos = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [selectedFunction, setSelectedFunction] = useState('');
  const [functionCode, setFunctionCode] = useState('');

  const handleCopyFunction = () => {
    const codeElement = document.querySelector(".function-content pre");
    if (codeElement) {
      const range = document.createRange();
      range.selectNode(codeElement);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand("copy");
      window.getSelection()?.removeAllRanges();
    }
  };

  const handleCommandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(event.target.value);
  };

  const handleExecuteCommand = () => {
    if (command.trim() === 'cairo-test hello-world.cairo') {
      runHelloWorldTests();
    } else if (command.trim() === 'cairo-test Assert.cairo') {
      runAssertTests();
    } else if (command.trim() === 'cairo-test Variable.cairo') {
      runVariableTests();
    } else if (command.trim() === 'cairo-run Variable.cairo') {
      runVariableTests2();
    } else if (command.trim() === 'cairo-run Functions.cairo') {
      runVariableTests2();
    } else {
      setOutput(['Command not recognized']);
    }


    setCommand('');
  };

  const runHelloWorldTests = () => {
    const testsOutput = [
      '[DEBUG] Hello, world!               (raw: 5735816763073854953388147237921)',
      '',
      'Run completed successfully, returning []',
    ];

    setOutput(testsOutput);
  };

  const runAssertTests = () => {
    const testsOutput = [
      'running 1 tests',
      'test Assert::Assert::test_main ... ok',
      'test result: ok. 1 passed; 0 failed; 0 ignored; 0 filtered out;',
    ];

    setOutput(testsOutput);
  };

  const runVariableTests = () => {
    const testsOutput = [
      'running 1 tests',
      'test Variable::Variable::test_main ... ok',
      'test result: ok. 1 passed; 0 failed; 0 ignored; 0 filtered out;',
    ];

    setOutput(testsOutput);
  };

  const runVariableTests2 = () => {
    const testsOutput = [
      'Run completed successfully, returning []',
    ];

    setOutput(testsOutput);
  };

  const handleFunctionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFunction = event.target.value;
    setSelectedFunction(selectedFunction);
    setFunctionCode(getFunctionCode(selectedFunction));
  };

  const getFunctionCode = (selectedFunction: string) => {
    switch (selectedFunction) {
      case 'hello-world':
        return `use debug::PrintTrait;

fn main() {
  'Hello, world!'.print();
}

// cairo-test hello-world.cairo`;

      case 'assert':
        return `fn main(x: felt252, y: felt252) {
   assert(x != y, 'error, x is equal to y');
}

#[test]
fn test_main() {
    main(1,2);
}

// cairo-test Assert.cairo`;

      case 'variables':
        return `fn main() {
  let immutable_var: felt252 = 17;
  // immutable_var = 38;  <-- fails to compile
      
  // but this is legal:
  let mut mutable_var: felt252 = immutable_var;
  mutable_var = 38;
      
  assert(mutable_var != immutable_var, 'mutable equals immutable');
}
      
#[test]
fn test_main() {
    main();
}
      
// cairo-test Variable.cairo
// cairo-run Variable.cairo`;

      case 'functions':
        return `fn main() {
  let x = 3;
}
        
// This function returns an u32.
fn inc(x: u32) -> u32 {
   x + 1
}
        
// cairo-run Functions.cairo`;

      default:
        return '';
    }
  };


return (
    <div className="comandos-container">
      <div className="terminal-container">
        <div className="terminal-header">
          <span className="terminal-dot terminal-red" />
          <span className="terminal-dot terminal-yellow" />
          <span className="terminal-dot terminal-green" />
        </div>
        <div className="terminal-body">
          <div className="terminal-output">
            {output.map((result, index) => (
              <pre key={index}>{result}</pre>
            ))}
          </div>
          <div className="terminal-input-container">
            <span className="terminal-prompt">$</span>
            <input
              className="terminal-input"
              value={command}
              onChange={handleCommandChange}
              onKeyDown={(e) => e.key === 'Enter' && handleExecuteCommand()}
              autoFocus
            />
          </div>
        </div>
  
        <div className="terminal-footer">
          <div className="function-container">
            <h2>Ejemplos Cairo - Ejecuta los comandos que encontrarán al final de cada función con //</h2>
            <div className="function-select-container">
              <label htmlFor="function-select">Selecciona una función:</label>
              <select
                id="function-select"
                value={selectedFunction}
                onChange={handleFunctionChange}
              >
                <option value="">-- Select --</option>
                <option value="hello-world">Hello World</option>
                <option value="assert">Assert</option>
                <option value="variables">Variables</option>
                <option value="functions">Funciones</option>
              </select>
            </div>
            {selectedFunction && (
              <div className="code-container">
                <div className="function-content">
                <div className="copy-link" onClick={handleCopyFunction}>
                <FontAwesomeIcon icon={faCopy} />
               </div>
                  <pre>{functionCode}</pre>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  

}
  
export default Comandos;

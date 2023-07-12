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
    } else if (command.trim() === 'cairo-run Expression_If.cairo') {
      runIfTest();
    } else if (command.trim() === 'cairo-run Name_parameters_2.cairo') {
      runNameParTest();
    } else if (command.trim() === 'cairo-run Name_parameters.cairo') {
      runNameParTest2();
    } else if (command.trim() === 'cairo-run Felt.cairo') {
      runFelt();
    } else if (command.trim() === 'cairo-run Felt2.cairo') {
      runFelt2();
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

const runIfTest = () => {
  const testsOutput = [
    '[DEBUG] Cairo is awesome!               (raw: 22928401211463211905187340600081071826209)',
    'Run completed successfully, returning []',
  ];

  setOutput(testsOutput);
};

const runNameParTest = () => {
    const testsOutput = [
      '[DEBUG]                                 (raw: 3)',
      '[DEBUG]                                 (raw: 4)',
      'Run completed successfully, returning []',
    ];

    setOutput(testsOutput);
};

const runNameParTest2 = () => {
    const testsOutput = [
      '[DEBUG]                                 (raw: 1)',
      '[DEBUG]                                 (raw: 2)',
      'Run completed successfully, returning []',
    ];

    setOutput(testsOutput);
};

const runFelt = () => {
    const testsOutput = [
      'Run completed successfully, returning []',
    ];

    setOutput(testsOutput);
};

const runFelt2 = () => {
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

      case 'if':
        return `use debug::PrintTrait;

fn main() {
    let is_awesome = true;

    if is_awesome {
        'Cairo is awesome!'.print();
    }
}
        
// cairo-run Expression_If.cairo`;

      case 'name_parameters_2':
        return `use debug::PrintTrait;

fn foo(x: u8, y: u8) {
    // ...
}

fn main() {
    let first_arg = 3;
    let second_arg = 4;
    // parameter_name: value
    foo(x: first_arg, y: second_arg);
    // foo(y: second_arg, x: first_arg); <- this would produce an error
    first_arg.print();
    second_arg.print();

}
        
// cairo-run Name_parameters_2.cairo`;

      case 'name_parameters2':
        return `use debug::PrintTrait;

fn foo(x: u8, y: u8) {
    // ...
}

fn main() {
    let first_arg = 3;
    let second_arg = 4;
    // parameter_name: value
    foo(x: first_arg, y: second_arg);
    // foo(y: second_arg, x: first_arg); <- this would produce an error
    first_arg.print();
    second_arg.print();

}
        
// cairo-run Name_parameters2.cairo`;

      case 'Name_parameters':
        return `use debug::PrintTrait;

fn foo(x: u8, y: u8) {
}

fn main() {
    let x = 1;
    let y = 2;
    foo(:x, :y);
    x.print();
    y.print();
}
        
// cairo-run Name_parameters.cairo`;

      case 'felt':
        return `fn main() {
   // max value of felt252
   let x = 3618502788666131213697322783095070105623107215331596699973092056135872020480;
   let y = 1;
   assert(x + y == 0, 'P == 0 (mod P)');
}
        
// cairo-run Felt.cairo`;

      case 'felt2':
        return `fn main() {
   // max value of felt252
   let x: felt252 = 3618502788666131213697322783095070105623107215331596699973092056135872020480;
   let y: felt252 = 1;
   assert(x + y == 0, 'P == 0 (mod P)');
    
}      
// cairo-run Felt2.cairo`;

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
              <label htmlFor="function-select">Selecciona una Ejemplo:</label>
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
                <option value="if">If Expression</option>
                <option value="Name_parameters">Name Parameters </option>
                <option value="name_parameters_2">Name Parameters 2</option>
                <option value="felt">Felt</option>
                <option value="felt2">Felt 2</option>
                
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

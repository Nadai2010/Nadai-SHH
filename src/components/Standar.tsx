import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import './Standar.css';

const Standar = () => {
  const [selectedFunction, setSelectedFunction] = useState('');
  const [functionCode, setFunctionCode] = useState('');
  const [argumentsList, setArgumentsList] = useState<string[]>([]);

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

  const handleFunctionChange = (event: any) => {
    const selectedFunction = event.target.value;
    setSelectedFunction(selectedFunction);
    setFunctionCode(getFunctionCode(selectedFunction));
    setArgumentsList(getArgumentsList(selectedFunction));
  };

  const getArgumentsList = (selectedFunction: any) => {
    switch (selectedFunction) {
      case 'Owner':
        return [
          'Class Hash: 0x04a0b25575b98b0dd16c1ffe5f85b6b310225437d5c151168c4ba010b498b3a0',
          'Argumentos del Constructor: 1',
          'Tipo de Dato: Dirección del Owner',
          'Ejemplo: 0x03F878C94De81906ba1A016aB0E228D361753536681a776ddA29674FfeBB3CB0',
        ];

        case 'Vote':
        return [
          'Class Hash: 0x8873aa28af0a0e6ac6aa647aa8e8c02cea7752bb7950284dbbbae1be35e9cb',
          'Argumentos del Constructor: 3',
          'Tipo de Dato: Direcciones registradas para votar',
          'Ejemplo: 0x03F878C94De81906ba1A016aB0E228D361753536681a776ddA29674FfeBB3CB0, 0x03F878C94De81906ba1A016aB0E228D361753536681a776ddA29674FfeBB3CB0, 0x03F878C94De81906ba1A016aB0E228D361753536681a776ddA29674FfeBB3CB0',
        ];

  
      
      default:
        return [];
    }
  };

  const getFunctionCode = (selectedFunction: any) => {
    switch (selectedFunction) {
      case 'Owner':
        return `use starknet::ContractAddress;

        #[starknet::interface]
        trait OwnableTrait<T> {
            fn transfer_ownership(ref self: T, new_owner: ContractAddress);
            fn get_owner(self: @T) -> ContractAddress;
        }
        
        #[starknet::contract]
        mod Ownable {
            use super::ContractAddress;
            use starknet::get_caller_address;
        
            #[event]
            #[derive(Drop, starknet::Event)]
            enum Event {
              OwnershipTransferred: OwnershipTransferred,  
            }
        
            #[derive(Drop, starknet::Event)]
            struct OwnershipTransferred {
                #[key]
                prev_owner: ContractAddress,
                #[key]
                new_owner: ContractAddress,
            }
        
            #[storage]
            struct Storage {
                owner: ContractAddress,
            }
        
            #[constructor]
            fn constructor(ref self: ContractState, init_owner: ContractAddress) {
                self.owner.write(init_owner);
            }
        
            #[external(v0)]
            impl OwnableImpl of super::OwnableTrait<ContractState> {
                fn transfer_ownership(ref self: ContractState, new_owner: ContractAddress) {
                    self.only_owner();
                    let prev_owner = self.owner.read();
                    self.owner.write(new_owner);
                    self.emit(Event::OwnershipTransferred(OwnershipTransferred {
                        prev_owner: prev_owner,
                        new_owner: new_owner,
                    }));
                }
        
                fn get_owner(self: @ContractState) -> ContractAddress {
                    self.owner.read()
                }
            }
        
            #[generate_trait]
            impl PrivateMethods of PrivateMethodsTrait {
                fn only_owner(self: @ContractState) {
                    let caller = get_caller_address();
                    assert(caller == self.owner.read(), 'Caller is not the owner');
                }
            }
        }`
      
      // Agrega más ejemplos de contrato para otras funciones aquí si es necesario
      
      default:
        return '';
    }
  };

  return (
    <div className="standar-container">
      <div className="functionstandar-container">
        <h2>Standar Smart Contract en Cairo - Escoge tu contrato y sus Argumentos para un Deploy Sencillo</h2>
        <div className="functionstandar-select-container">
          <label htmlFor="functionstandar-select">Contracts:</label>
          <select
            id="functionstandar-select"
            value={selectedFunction}
            onChange={handleFunctionChange}
          >
            <option value="">-- Select --</option>
            <option value="Owner">Owner</option>
            
          </select>
        </div>
        {selectedFunction && (
          <div className="code-standar-arguments-container">
            <div className="functionstandar-content">
              <div className="copystandar-link" onClick={handleCopyFunction}>
                <FontAwesomeIcon icon={faCopy} />
              </div>
              <pre>{functionCode}</pre>
            </div>
            <div className="arguments-standar-list">
              <h3>Argumentos Posibles:</h3>
              <ul>
                {argumentsList.map((arg, index) => (
                  <li key={index}>{arg}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Standar;



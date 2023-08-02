import React, { useState, useCallback } from 'react';
import { useContractWrite } from '@starknet-react/core';
import { parseFixed } from '@ethersproject/bignumber';
import './Multicall2.css';

const Multicall2 = () => {
  const [mintNai, setMintNai] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMintNai(value);
  };

  const mintTxArray = Array(100).fill(0).map((_, index) => ({
    contractAddress: '0x07686ccbe3e33aefec722bd7211e42e47269f16a2a918318bdb27a99c926899b',
    entrypoint: 'mint',
    calldata: [mintNai ? parseFixed(mintNai, 18).toString() : '0', index.toString()],
  }));

  const { write } = useContractWrite({ calls: mintTxArray });

  const handleMint = useCallback(() => {
    write();
  }, [write]);

  return (
    <div>
      <div className="multicall-title text-4xl shadowed mb-5">Mint NAI</div>

      <div className="multicall-container">
        <div className="input-field">
          <label>Cantidad Mint de NAI</label>
          <input
            type="number"
            value={mintNai}
            onChange={handleInputChange}
          />
        </div>

        <div className="btn-container">
          <button className="btn" onClick={handleMint}>
            Mint NAI 100 veces
          </button>
        </div>
      </div>
    </div>
  );
};

export default Multicall2;

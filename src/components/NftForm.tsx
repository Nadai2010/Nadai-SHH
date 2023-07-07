import { useAccount, useBalance, useContractWrite } from "@starknet-react/core";
import React, { FormEvent, useEffect, useState } from "react";
import { stark } from "starknet";
import { truncate } from "../lib/utils";
import "./NftForm.css";

const nfts = [
    {
      symbol: "NHS - 1",
      contractAddress: "0x058fb0b06fd6844a909031e56a95dfd859320e44c12538e7da419e9fc4475f90",
      metadata: {
        name: "HDS - Episodio 1",
        description: "Primer Episodio Introducciotr sobre Staknet",
        image: "https://ipfs.io/ipfs/QmaAwa9LBNCmwJKmf14j8wvuQUsYYbijq3kLQjeB9wVtHB/1.gif",
      },
    },
    {
      symbol: "NHS - 2",
      contractAddress: "0x0115b36e34b88c08d71eb648218d94e1333344a2f141963c3dbf892b18e292e5",
      metadata: {
        name: "Mi NFT 2",
        description: "Descripción de mi NFT 2",
        image: "",
      },
    },
    {
      symbol: "NHS - 1",
      contractAddress: "0x058fb0b06fd6844a909031e56a95dfd859320e44c12538e7da419e9fc4475f90",
      metadata: {
        name: "HDS - Episodio 1",
        description: "Descripción de mi NFT 1",
        image: "https://ipfs.io/ipfs/QmdEmJRkeyz1FYY5RfLXVfKwEvkC68aSwzAfFh2v8n5ccW/1.gif",
      },
    },  {
      symbol: "NHS - 1",
      contractAddress: "0x058fb0b06fd6844a909031e56a95dfd859320e44c12538e7da419e9fc4475f90",
      metadata: {
        name: "HDS - Episodio 1",
        description: "Descripción de mi NFT 1",
        image: "https://ipfs.io/ipfs/QmdEmJRkeyz1FYY5RfLXVfKwEvkC68aSwzAfFh2v8n5ccW/1.gif",
      },
    },  {
      symbol: "NHS - 1",
      contractAddress: "0x058fb0b06fd6844a909031e56a95dfd859320e44c12538e7da419e9fc4475f90",
      metadata: {
        name: "HDS - Episodio 1",
        description: "Descripción de mi NFT 1",
        image: "https://ipfs.io/ipfs/QmdEmJRkeyz1FYY5RfLXVfKwEvkC68aSwzAfFh2v8n5ccW/1.gif",
      },
    },  {
      symbol: "NHS - 1",
      contractAddress: "0x058fb0b06fd6844a909031e56a95dfd859320e44c12538e7da419e9fc4475f90",
      metadata: {
        name: "HDS - Episodio 1",
        description: "Descripción de mi NFT 1",
        image: "https://ipfs.io/ipfs/QmdEmJRkeyz1FYY5RfLXVfKwEvkC68aSwzAfFh2v8n5ccW/1.gif",
      },
    },  {
      symbol: "NHS - 1",
      contractAddress: "0x058fb0b06fd6844a909031e56a95dfd859320e44c12538e7da419e9fc4475f90",
      metadata: {
        name: "HDS - Episodio 1",
        description: "Descripción de mi NFT 1",
        image: "https://ipfs.io/ipfs/QmdEmJRkeyz1FYY5RfLXVfKwEvkC68aSwzAfFh2v8n5ccW/1.gif",
      },
    },  {
      symbol: "NHS - 1",
      contractAddress: "0x058fb0b06fd6844a909031e56a95dfd859320e44c12538e7da419e9fc4475f90",
      metadata: {
        name: "HDS - Episodio 1",
        description: "Descripción de mi NFT 1",
        image: "https://ipfs.io/ipfs/QmdEmJRkeyz1FYY5RfLXVfKwEvkC68aSwzAfFh2v8n5ccW/1.gif",
      },
    },  {
      symbol: "NHS - 9",
      contractAddress: "0x058fb0b06fd6844a909031e56a95dfd859320e44c12538e7da419e9fc4475f90",
      metadata: {
        name: "HDS - Episodio 9",
        description: "Descripción de mi NFT 1",
        image: "https://ipfs.io/ipfs/QmdEmJRkeyz1FYY5RfLXVfKwEvkC68aSwzAfFh2v8n5ccW/1.gif",
      },
    },
  ];

export default function NftForm() {
  const { address } = useAccount();
  const [selectedNFT, setSelectedNFT] = useState(nfts[0]);
  const [_from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [token_id, setToken_id] = useState("");
  const call = "0";
  const [secretWord, setSecretWord] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [nftMetadata, setNftMetadata] = useState<any>({});
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    const metadata = selectedNFT.metadata || {};
    setNftMetadata(metadata);
  }, [selectedNFT]);

  const { data: balance } = useBalance({
    address,
    token: selectedNFT?.contractAddress,
  });

  const calldata = stark.compileCalldata({
    _from,
    to,
    token_id,
    call,
  });

  const calls = showButton
    ? {
        contractAddress: selectedNFT.contractAddress,
        entrypoint: "transferFrom",
        calldata,
      }
    : undefined;

  const { write, isLoading, data } = useContractWrite({
    calls,
  });

  function send(event: FormEvent) {
    event.preventDefault();
    write();
  }

  function handleSecretWordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSecretWord(event.target.value);
    setShowButton(event.target.value === "Nadai");
  }

  function handleImageClick() {
    setExpanded(!isExpanded);
  }

  return (
    <div className={`token-form ${isExpanded ? "expanded" : ""}`}>
      <div>
        <h3>
          {selectedNFT?.symbol} token{" "}
          <a
            href={`https://goerli.voyager.online/contract/${selectedNFT?.contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncate(selectedNFT?.contractAddress)} ↗
          </a>
        </h3>
        <strong>
          Balance: {balance?.formatted} {selectedNFT?.symbol}
        </strong>
        {nftMetadata && (
          <div>
            <img
              className={`nft-image ${isExpanded ? "expanded" : ""}`}
              src={nftMetadata?.image}
              alt={nftMetadata?.name}
              onClick={handleImageClick}
            />
            <p>Name: {nftMetadata?.name}</p>
            <p>Description: {nftMetadata?.description}</p>
          </div>
        )}
        <form onSubmit={send}>
          <select
            value={selectedNFT?.symbol}
            onChange={(e) => {
              const selected = nfts.find((nft) => nft.symbol === e.target.value);
              if (selected) setSelectedNFT(selected);
            }}
          >
            {nfts.map((nft) => (
              <option key={nft.symbol} value={nft.symbol}>
                {nft.symbol}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="from"
            placeholder="From"
            required
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="text"
            name="to"
            placeholder="Recipient"
            required
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            type="text"
            name="token_id"
            placeholder="Token ID"
            required
            onChange={(e) => setToken_id(e.target.value)}
          />
          <input
            type="password"
            name="secretWord"
            placeholder="Secret Word Nadai"
            required
            value={secretWord}
            onChange={handleSecretWordChange}
          />
          {showButton && (
            <button type="submit" className="btn-submit">
              Enviar
            </button>
          )}
        </form>
        {isLoading && <p>tx pendiente...</p>}
        {data && <p>Tx: {data.transaction_hash}</p>}
      </div>
    </div>
  );
}

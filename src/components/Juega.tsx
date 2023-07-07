import { useAccount, useBalance, useContractWrite } from "@starknet-react/core";
import { FormEvent, useMemo, useState } from "react";
import "./Juega.css";

export default function Juega() {
  const { address } = useAccount();
  const [to, setTo] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [secretWord, setSecretWord] = useState("");
  const [showButton, setShowButton] = useState(false);

  const { data: balance } = useBalance({
    address: address,
  });

  const calls = useMemo(() => {
    if (!tokenId || !to || !showButton) return undefined;

    const calldata = {
      to,
      tokenId: Number(tokenId),
    };

    return [{
      contractAddress: "0x03a1db2968737c3b2797accd5f3d6c9daf15c563e4a8de0ad061e88a42043739", // Reemplaza con la dirección correcta del contrato ERC721
      entrypoint: "mint",
      calldata: [calldata],
    }];
  }, [to, tokenId, showButton]);

  const { write, isLoading, data } = useContractWrite({ calls });

  async function mint(event: FormEvent) {
    event.preventDefault();
    write();
  }

  function handleSecretWordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSecretWord(event.target.value);
    setShowButton(event.target.value === "Nadai"); // Reemplaza "tu_palabra_secreta" con tu palabra secreta real
  }

  return (
    <div className="juega">
      <h3>Mint de un NFT ERC721</h3>
      <strong>Tu dirección: {address}</strong>
      <form onSubmit={mint}>
        <input
          type="text"
          name="to"
          placeholder="Dirección del destinatario"
          required
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="number"
          name="tokenId"
          placeholder="ID del token"
          required
          onChange={(e) => setTokenId(e.target.value)}
        />
        <input
          type="password"
          name="secretWord"
          placeholder="Palabra secreta"
          required
          value={secretWord}
          onChange={handleSecretWordChange}
        />
        {showButton && (
          <button type="submit" className="btn-mint">
            Mint
          </button>
        )}
      </form>
      {isLoading && <p>Transacción pendiente...</p>}
      {data && <p>Tx: {data.transaction_hash}</p>}
      <p>Tu saldo: {balance?.formatted}</p>
    </div>
  );
}

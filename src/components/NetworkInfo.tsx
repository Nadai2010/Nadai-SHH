import { useBlock, useNetwork } from "@starknet-react/core";
import "./NetworkInfo.css";

export default function NetworkInfo() {
  const { data } = useBlock({
    refetchInterval: 10_000,
    blockIdentifier: "latest",
  });
  const { chain } = useNetwork();

  return (
    <div className="network-info-container">
      {chain && <p>Conectado a {chain.name}</p>}
      <p>
        Bloque actual: {data?.block_number}, {data?.transactions.length}{" "}
        transacciones
      </p>
    </div>
  );
}



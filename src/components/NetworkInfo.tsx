import { useState, useEffect } from "react";
import { useBlock, useNetwork } from "@starknet-react/core";
import "./NetworkInfo.css";
import Loading from "react-loading";

export default function NetworkInfo() {
  const [tps, setTps] = useState(0);
  const [lastBlockNumber, setLastBlockNumber] = useState<number | null>(null);
  const [lastTimestamp, setLastTimestamp] = useState<number | null>(null);
  const { data } = useBlock({
    refetchInterval: 10_000,
    blockIdentifier: "latest",
  });
  const { chain } = useNetwork();

  useEffect(() => {
    if (
      data &&
      data.block_number &&
      data.timestamp &&
      data.transactions &&
      data.block_number !== lastBlockNumber
    ) {
      const timestamp = data.timestamp;
      const transactionsCount = data.transactions.length;

      if (lastBlockNumber !== null && lastTimestamp !== null) {
        const timeSinceLastBlock = timestamp - lastTimestamp;
        const tpsValue = transactionsCount / (timeSinceLastBlock || 1);
        setTps(tpsValue);
      } else {
        setTps(0);
      }

      setLastBlockNumber(data.block_number);
      setLastTimestamp(timestamp);
    }
  }, [data, lastBlockNumber, lastTimestamp]);

  return (
    <div className="network-info-container">
      {chain && <p>Conectado a {chain.name}</p>}
      <p>
        Bloque actual: {data?.block_number}, {data?.transactions.length} transacciones
      </p>
      {tps > 0 ? (
        <p>TPS: {tps.toFixed(2)}</p>
      ) : (
        <Loading type="spin" color="#000000" height={30} width={30} />
      )}
    </div>
  );
}

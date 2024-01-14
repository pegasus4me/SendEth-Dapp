"use client";
import * as React from "react";
import { useConnect } from "wagmi";
import { useState, useEffect } from "react";
import { injected } from "wagmi/connectors";
import { ConnectErrorType } from "@wagmi/core";
import { AiOutlineDisconnect } from "react-icons/ai";
import { useAccount, useDisconnect } from "wagmi";
import { arbitrumSepolia } from "viem/chains";
import { Config } from "@/config/config";
import { useBalance } from "wagmi";

const WalletOptions = () => {
  const [message] = useState<string | undefined>("connect wallet");
  const [address, setAddress] = useState<string | undefined>();
  const [error, setError] = useState<ConnectErrorType | null>(null);
  const { connect, status, data, failureReason, reset, connectors } =
    useConnect();
  const {
    status: check,
    isConnected,
    isDisconnected,
    addresses,
    chainId,
    chain,
  } = useAccount();
  const { disconnect } = useDisconnect();
  // ---------------------------------------------------------------
  const EthWalletBalance = useBalance({
    address: address as `0x${string}`,
  });
  //////////////////////////////////////////////
  useEffect(() => {
    if (status === "error") {
      setError(failureReason);
    }
    // si il est connecté display le wallet
    if (status == "success" && addresses && addresses?.length !== 0) {
      setAddress(addresses[0]);
    }
  }, [status, data, check, addresses]);

  //////////////////////////////////////////////
  return (
    <>
    <div className="flex flex-row items-center ">
      <button
        onClick={() => connect({ connector: injected() })}
        className="bg-orange-400 px-3 rounded-full py-1 text-neutral-200 border-orange-600"
      >
        {check === "disconnected"
          ? message
          : check === "connected"
          ? addresses[0]?.slice(0, 6) + "..." + addresses[0]?.slice(-3)
          : "pending"}
      </button>

      {check === "connected" ? (
        <button onClick={() => disconnect()} className="p-2 ml-4 font-medium">
          <AiOutlineDisconnect />
        </button>
      ) : null}

      {check === "connected" && (
        <p className="text-sm font-medium">
          {EthWalletBalance.data?.formatted} Ξ
        </p>
      )}

    </div>
    
    {chainId !== arbitrumSepolia.id && check == "connected" ? (
        <p 
        className="text-red-400 font-medium text-sm"
        >wrong chain switch to arbitrum sepolia</p>
      ) : null}
    </>
    
  );
};

export default WalletOptions;

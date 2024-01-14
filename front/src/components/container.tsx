"use client";
import { useAccount } from "wagmi";
import { useState } from "react";
import { parseEther } from "viem";
import { abi } from "../config/abi";
import { formatEther } from 'viem'
import { type BaseError, useWriteContract, useReadContract } from "wagmi";

// invocked contract address 
const contractAddress = "0x6759888C863C5CB7dE1bf54B1C1Bb0036c251356";

export const Container = (): JSX.Element => {
  const [amount, setAmount] = useState<undefined | string>();
  const [receiver, setReceiver] = useState<string | undefined>();
  const { addresses } = useAccount();
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  function deposit() {
    const parseETH:bigint = parseEther(amount as string);

    if (amount) {
      try {
        writeContract({
          address: contractAddress,
          abi,
          functionName: "depostit",
          value :parseETH, 
          account : addresses?.[0] as `0x${string}`
        });

      } catch (error) {
        let message = "Unknow error";
        if (error instanceof Error) message = error.message;
        throw new Error(message);
      }
    }
  }

  const { data } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "checkBalance",
  });

  async function send(): Promise<void> {
    const parseETH:bigint = parseEther(amount as string);
    if (amount && receiver) {
      try {
        // initialisation d'un appel de transfer de fonds

        writeContract({
          address: contractAddress,
          abi,
          functionName: "sendEth",
          args: [receiver as `0x${string}`, parseETH],
        });
      } catch (error: any) {
        let message = "Unknow error";
        if (error instanceof Error) message = error.message;
        throw new Error(message);
      }
    } else {
      console.log("amount or receiver must be completed!");
    }
  }

  return (
    <section className="p-4">
      <p className="text-center text-3xl font-semibold">
        contract user balance :{" "}
        <span className="font-light">{data ? formatEther(data!) : "loading..."} Ξ</span>
      </p>

      <form onSubmit={() => send()} className="flex justify-center mt-5 gap-4 ">
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
          className="border py-2 px-4"
          placeholder="amount"
        />
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setReceiver(e.target.value)
          }
          className="border py-2 px-4"
          placeholder="receiver"
        />
      </form>
      <p className="text-center mt-4">
        {hash && (
          <a href={`https://sepolia.arbiscan.io/tx/${hash}`}>
            view your transaction
          </a>
        )}
      </p>
      {error && (
        <p className="text-center mt-4">
          Error :{`${(error as BaseError).shortMessage || error.message}.`}
        </p>
      )}
      {/* temporaire */}
      <div className="flex gap-5 justify-center mt-10">
        <button
          className="py-2 px-4 rounded-md bg-orange-500 hover:bg-orange-200"
          disabled={isPending}
          onClick={() => deposit()}
        >
          {isPending ? "Confirming..." : "deposit"}
        </button>
        <button
          className="py-2 px-4 rounded-md bg-orange-200 hover:bg-orange-500"
          disabled={isPending}
          onClick={() => send()}
        >
          {isPending ? "Confirming..." : "send"}
        </button>
      </div>
    </section>
  );
};

"use client";
import { useState, useEffect } from "react";
import WalletOptions from "./wallet-options";
const Header = () : JSX.Element => {
  const [connection, setConnection] = useState<boolean>(false);
  return (
    <header className="flex border max-w-[80%] m-auto rounded-lg items-center mt-5 justify-around p-2">
      <h1 className="text-2xl ml-10 font-semibold ">EthSender</h1>
      <section>
        <WalletOptions />
      </section>
    </header>
  );
};

export default Header;

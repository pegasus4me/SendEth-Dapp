'use client'
import { WagmiProvider } from "wagmi";
import { Config } from "@/config/config";

const WProvider = ({children} : {children : React.ReactNode}) : JSX.Element => {
    return <WagmiProvider config={Config}>{children}</WagmiProvider>
}
export default WProvider
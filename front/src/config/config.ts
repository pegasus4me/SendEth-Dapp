import { http, createConfig } from "wagmi";
import { arbitrumSepolia } from "viem/chains";
import { walletConnect } from 'wagmi/connectors'
import { createClient } from "viem";

const projectId:string  = "404a67488adc6ef8be7508036e95de13"
export const Config = createConfig({
  chains: [arbitrumSepolia],
  connectors : [
    walletConnect({
        projectId : projectId,

        metadata : {
            name : "eclipse", 
            description : "send eth and receive",
            url: "sendeth.io",
            icons : []
        },

        qrModalOptions :{
            themeMode : "light"
        }
    })
  ],
 

  transports: {
    [arbitrumSepolia.id]: http(),
  },
});

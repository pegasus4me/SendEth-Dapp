import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import WProvider from "@/wrappers/wagmiProvider";
import Query from "@/wrappers/Query";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Send eth",
  description: "Sent and receive eth",
};
// setup react query client

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WProvider>
          <Query>
            <Header />
            {children}
          </Query>
        </WProvider>
      </body>
    </html>
  );
}

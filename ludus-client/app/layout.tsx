import "./globals.css";
import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Player } from "@/components/Player";
import { Azeret_Mono } from "next/font/google";

const Azert = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

import { ContextProvider } from "@/public/assets/contextprovider";

export const metadata: Metadata = {
  title: "LUDUS",
  description: "LUDUS: Escritura creativa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={Azert.className}>
      <body>
        <ContextProvider>
          <NavBar />
          <Player />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}

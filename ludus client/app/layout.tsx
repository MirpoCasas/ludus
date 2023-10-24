import './globals.css'
import type { Metadata } from 'next'
import { NavBar } from '@/components/NavBar'
import { Player } from '@/components/Player'



export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <NavBar />
      <Player />
        {children}
        </body>
    </html>
  )
}

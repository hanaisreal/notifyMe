import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  manifest: "manifest.json",
  title: 'NotifyMe',
  description: 'Make me busy',
}

export const viewport= { //added
  themeColor: "#FFFFFF",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

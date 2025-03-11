import type React from "react"
import { Suspense } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { MainNav } from "@/components/main-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Next.js Data Fetching Strategies",
  description: "A demonstration of different data fetching strategies in Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="border-b">
            <div className="container mx-auto py-4">
              <h1 className="text-3xl font-bold text-center mb-6">Next.js Data Fetching Strategies</h1>
              <MainNav />
            </div>
          </header>
          <main className="flex-1 py-8">
            <Suspense fallback={<div className="container mx-auto">Loading...</div>}>{children}</Suspense>
          </main>
          <footer className="border-t py-4">
            <div className="container mx-auto text-center text-sm text-muted-foreground">
              <p>Reload the page to test caching behavior. For proper ISR testing, use production mode.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}


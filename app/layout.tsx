import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hostel Management System",
  description: "A comprehensive hostel management system for educational institutions",
  icons: {
    icon: "/logo.png", // /public/logo.png
    shortcut: "/logo.png", // /public/logo.png
    apple: "/logo.png", // /public/logo.png
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo.png", // /public/logo.png
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " dark:bg-gray-900 dark:text-gray-50"}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
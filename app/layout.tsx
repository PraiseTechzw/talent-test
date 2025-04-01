import type React from "react"
import { AuthProvider } from "@/hooks/use-auth"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <ToastProvider>
              <Toast />
              {children}
            </ToastProvider>
           </AuthProvider>

        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
import { Toast, ToastProvider } from "@/components/ui/toast"

export const metadata = {
      generator: 'v0.dev'
    };

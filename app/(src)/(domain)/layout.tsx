import '../(infraestructure)/styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// Este archivo define la estructura física de la app, acá se pueden configurar headers, footers, estilos...
export const metadata = {
  title: 'URLs App',
  description: 'Url Shortener Frontend',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

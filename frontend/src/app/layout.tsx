import './globals.css'
import '../styles/theme.css'
import { Metadata } from 'next'
import Header from '../components/Header'

// PUBLIC_INTERFACE
export const metadata: Metadata = {
  title: 'Recipe Browser',
  description: 'Browse and view delicious recipes',
}

/**
 * Root layout for the Recipe Browser app.
 * Applies global styles and theme, renders Header and child pages.
 * @param {React.ReactNode} children - Main page content
 * @returns {JSX.Element} - Application shell
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="midnight-minimal">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}

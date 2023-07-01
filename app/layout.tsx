import Navbar from '@/components/Navbar'
import './globals.css'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Coders Blog',
  description: 'Spread your coding knowledge to others.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="container mx-auto font-sans">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}

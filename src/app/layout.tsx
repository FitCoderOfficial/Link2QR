import type { Metadata } from 'next'
import '../../styles/globals.css'
import Nav from '../../components/Nav'


export const metadata: Metadata = {
  title: 'My QR Code',
  description: 'QR Code Generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
          
        </main>
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import '../../styles/globals.css'
import Nav from '../../components/Nav'
import Feed from '../../components/Feed'

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
        <div className=''>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
          <Feed />
        </main>
      </body>
    </html>
  )
}
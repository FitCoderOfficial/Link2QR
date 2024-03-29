import type { Metadata } from 'next'
import '../../styles/globals.css'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"



export const metadata: Metadata = {
  title: {
    default: "큐알 코드 생성 Link2QR",
    template: "큐알 코드 생성 Link2QR | %s",
  },
  description: '쉬운 큐알 코드 생성기입니다. QR코드를 쉽게 만들어보세요.링크, 카페 와이파이, 연락처 모두 쉽게 만들 수 있어요!',
  icons: {
    icon: "/favicon.ico",
  },
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
          <Analytics />
          <SpeedInsights />
          <Footer />
        </main>
      </body>
    </html>
  )
}
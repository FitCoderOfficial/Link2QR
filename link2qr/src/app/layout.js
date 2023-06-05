import './globals.css'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer';

export const metadata = {
  title: {
    default: "Link2QR",
    template: "Link2QR | %s",
  },
  description: 'QR코드를 쉽게 만들어보세요.링크, 카페 와이파이, 연락처 모두 쉽게 만들 수 있어요!',
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}

import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'


export const metadata = {
    title: "GreenFitAi",
    description: "당신을 위한 건강한 삶의 가이드!"
}


const Rootlayout = ({children}) => {
  return (
    <html lang='ko'>
        <body>
            <Provider>
            <div className='main'> 
                <div className='gradient' />
            </div>

            <main className='app'>
                <Nav />
                {children}
            </main>
            </Provider>
        </body>
    </html>
  )
}

export default Rootlayout
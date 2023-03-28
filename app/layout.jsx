import '@styles/globals.css'

export const metadata = {
    title: "GreenFitAi",
    description: "Your Personal Guide to Wellness!"
}


const Rootlayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <div className='main'> 
                <div className='gradient' />
            </div>

            <main className='app'>
                {children}
            </main>
        </body>
    </html>
  )
}

export default Rootlayout
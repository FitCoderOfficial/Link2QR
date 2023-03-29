import React from 'react'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Just Do it
        <br className='max-md:hidden' />
        <span className='green_gradient'>Your Personal Guide to Wellness!</span>
      </h1>
      <p className='desc text-center'>
        Green Fit Ai is an open-source project that aims to help people live a healthier life.
      </p>
    </section>
  )
}

export default Home
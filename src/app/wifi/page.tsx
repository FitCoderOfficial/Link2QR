import WifiFeed from '../../../components/Feed_Wifi'

const page = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        복잡한 와이파이 대신
        <br />
        <span className='blue_gradient text-center'> QR 코드로 더 쉽게</span>
      </h1>
      <p className='desc text-center'>
      My QR은 혁신적인 방식으로 와이파이 정보를 공유합니다. <br />간편하게 QR 코드를 생성하고, 친구들과 공유하세요.
      </p>

      <WifiFeed />
    </section>
    
  )
}

export default page
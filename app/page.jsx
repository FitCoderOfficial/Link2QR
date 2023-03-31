import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        헬스 케어 AI
        <br />
        <span className='green_gradient'>건강한 삶을 
        <br className='lg:hidden'/>위한 모든 것</span>
      </h1>
      <p className='desc text-center'>
        Green Fit Ai는 사람들이 더 건강한 삶을 살 수 있도록<br/> 돕는 것을 목표로 하는 오픈 소스 프로젝트입니다
      </p>


      <Feed />
    </section>
  )
}

export default Home
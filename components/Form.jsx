import Link from 'next/link'

const Form = ({ type, post, setpost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} 포스트</span>
      </h1>

      <p className='desc text-left max-w-md'>
        {type} 포스트를 작성해주세요
      </p>

      <form
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        onSubmit={handleSubmit}>
        <label>
          <span className='font-notosans font-semibold text-xl text-gray-700'>
            제목
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setpost({ ...post, prompt: e.target.value })}
            placeholder='제목을 입력해주세요'
            required
            className='form_textarea'
          />
        </label>

        <label>
          <span className='font-notosans font-semibold text-xl text-gray-700'>
            태그 {``}
            <span className='text-lg font-normal'>(#운동, #웹개발, #아이디어)</span>
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setpost({ ...post, tag: e.target.value })}
            placeholder='태그를 입력해주세요'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 gap-4'>
          <Link href='/' className='font-notosans font-light text-grey-500 text-lg'>
            취소
          </Link>

          <button
            type='submit'
            className='font-notosans font-light px-5 py-1.5 text-lg bg-blue-600 text-white rounded-full'
            disabled={submitting}
          >

            {submitting ? '등록중...' : '등록하기'}
          </button>
        </div>


      </form>



    </section>
  )
}

export default Form
'use client'

import { useState, useEffect } from 'react'

import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
        ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post')
      const data = await res.json()
      setPosts(data)
    }

    fetchPosts()
  }, [])


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='아이디 혹은 태그로 검색해보세요'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />

      </form>      
      <PromptCardList
        data={[posts]}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed
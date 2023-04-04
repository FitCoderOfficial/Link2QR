'use client'

import { useState } from "react"
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"

import Form from "@components/Form"

const CreatePrompt = () => {

  const [submitting, setsubmitting] = useState(false)
  const [post, setpost] = useState({
    title: '',
    body: '',
  })

  const createPrompt = async (e) => {

  }

  return (
    <Form 
      type='Create'
      post={post}
      setpost={setpost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
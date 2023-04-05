'use client'

import { useState } from "react"
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"

import Form from "@components/Form"

const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [submitting, setSubmitting] = useState(false)
  const [post, setpost] = useState({
    title: '',
    body: '',
  })

  const createPrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userid: session?.user.id,
          tag: post.tag,
        })
      })
      if (res.ok) {
        router.push('/')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
    } 
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
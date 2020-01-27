import React, { useState, useContext } from "react"
import { Form, Input, Button } from "../components/common"
import { FirebaseContext } from "../components/Firebase"

export default function AddAuthor() {
  const { firebase } = useContext(FirebaseContext)
  const [authorName, setAuthorName] = useState("")
  const [success, setSuccess] = useState(false)

  function handleInputChange(event) {
    event.persist()
    setSuccess(false)
    setAuthorName(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    firebase.createAuthor({ authorName }).then(function () {
      setAuthorName('')
      setSuccess(true)
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Author name"
        value={authorName}
        onChange={handleInputChange}
      />
      {!!success && <div style={{marginBottom: '14px'}}>Author created successfully</div>}
      <Button type="submit" block>
        Add new author
      </Button>
    </Form>
  )
}

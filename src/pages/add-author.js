import React, { useState, useContext, useEffect } from "react"
import { Form, Input, Button } from "../components/common"
import { FirebaseContext } from "../components/Firebase"

let isMounted

export default function AddAuthor() {
  const { firebase } = useContext(FirebaseContext)
  const [authorName, setAuthorName] = useState("")
  const [success, setSuccess] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(function() {
    isMounted = true
    return function() {
      isMounted = false
    }
  }, [])

  function handleInputChange(event) {
    event.persist()
    setSuccess(false)
    setAuthorName(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    firebase.createAuthor({ authorName }).then(function() {
      if (isMounted) {
        setAuthorName("")
        setSuccess(true)
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Author name"
        value={authorName}
        onChange={handleInputChange}
      />
      {!!success && (
        <div style={{ marginBottom: "14px" }}>Author created successfully</div>
      )}
      <Button type="submit" block>
        Add new author
      </Button>
    </Form>
  )
}

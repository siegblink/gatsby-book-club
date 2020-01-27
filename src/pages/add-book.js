import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { FirebaseContext } from "../components/Firebase"
import { Form, Input, Button } from "../components/common"

const FormField = styled.div`
  margin-bottom: 20px;
`
let fileReader
if (typeof window !== "undefined") {
  fileReader = new FileReader()
}

export default function Addbook() {
  const { firebase } = useContext(FirebaseContext)
  const [authors, setAuthors] = useState([])
  const [bookCover, setBookCover] = useState("")
  const [bookName, setBookName] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [summary, setSummary] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(function() {
    fileReader.addEventListener("load", function() {
      setBookCover(fileReader.result)
    })
  }, [])

  useEffect(
    function() {
      // Query all available authors
      if (firebase) {
        firebase.getAuthors().then(function(snapshot) {
          const availableAuthors = []
          snapshot.forEach(function(doc) {
            availableAuthors.push({
              id: doc.id,
              ...doc.data(),
            })
          })
          setAuthorId(availableAuthors[0].id)
          setAuthors(availableAuthors)
        })
      }
    },
    [firebase]
  )

  function handleInputChange(event) {
    event.persist()
    setSuccess(false)
    event.target.name === "bookSummary" && setSummary(event.target.value)
    event.target.name === "bookName"
      ? setBookName(event.target.value)
      : setAuthorId(event.target.value)
  }

  function handleFileUpload(event) {
    event.persist()
    setSuccess(false)
    fileReader.readAsDataURL(event.target.files[0])
  }

  function handleSubmit(event) {
    event.preventDefault()
    firebase
      .createBook({ bookCover, bookName, authorId, summary })
      .then(function() {
        setSuccess(true)
      })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        <Input
          placeholder="Book name"
          name="bookName"
          value={bookName}
          onChange={handleInputChange}
        />
      </FormField>
      <FormField>
        <strong>Author</strong>
        <div>
          <select name="authorId" onBlur={handleInputChange}>
            {authors.map(function(author) {
              return (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              )
            })}
          </select>
        </div>
      </FormField>
      <FormField>
        <strong>Book cover</strong>
        <Input type="file" onChange={handleFileUpload} />
      </FormField>
      <FormField>
        <strong>Summary</strong>
        <Input
          placeholder="Book summary"
          name="bookSummary"
          value={summary}
          onChange={handleInputChange}
        />
      </FormField>
      {!!success && (
        <div style={{ marginBottom: "14px" }}>New book added successfully</div>
      )}
      <Button type="submit" block>
        Add new book
      </Button>
    </Form>
  )
}

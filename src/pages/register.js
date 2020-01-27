import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import { Form, Input, Button, ErrorMessage } from "../components/common/"
import { FirebaseContext } from "../components/Firebase"

export default function() {
  const { firebase } = useContext(FirebaseContext)
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errorMessage, setErrorMessage] = useState("")

  function handleInputChange(event) {
    event.persist()
    setErrorMessage("")
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (formValues.password === formValues.confirmPassword) {
      firebase
        .register({
          username: formValues.username,
          email: formValues.email,
          password: formValues.password,
        })
        .then(() => navigate("/"))
        .catch(error => setErrorMessage(error.message))
    } else {
      setErrorMessage("Password and Confirm Password fields must match")
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="username"
        placeholder="Username"
        value={formValues.username}
        onChange={handleInputChange}
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formValues.email}
        onChange={handleInputChange}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formValues.password}
        onChange={handleInputChange}
        required
        minLength={6}
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={formValues.confirmPassword}
        onChange={handleInputChange}
        required
        minLength={6}
      />
      {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Button type="submit" block>
        Register
      </Button>
    </Form>
  )
}

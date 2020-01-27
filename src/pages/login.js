import React, { useState, useContext } from "react"
import { FirebaseContext } from "../components/Firebase"
import { Form, Input, Button, ErrorMessage } from "../components/common/"
import { navigate } from "gatsby"

export default function Login() {
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const { firebase } = useContext(FirebaseContext)

  function onSubmit(event) {
    event.preventDefault()
    firebase
      .login({ email: formValues.email, password: formValues.password })
      .then(() => navigate("/"))
      .catch(error => {
        setErrorMessage(error.message)
      })
  }

  function handleInputChange(event) {
    event.persist()
    setErrorMessage("")
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <section>
      <Form onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          name="password"
          password="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleInputChange}
        />
        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button type="submit" block>
          Login
        </Button>
      </Form>
    </section>
  )
}

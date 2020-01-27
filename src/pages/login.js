import React, { useState, useContext, useEffect } from "react"
import { FirebaseContext } from "../components/Firebase"
import { Form, Input, Button, ErrorMessage } from "../components/common/"
import { navigate } from "gatsby"

let isMounted

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const { firebase } = useContext(FirebaseContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(function () {
    isMounted = true
    return function() {
      isMounted = false
    }
  }, [])

  function onSubmit(event) {
    event.preventDefault()
    firebase
      .login({
        email: formValues.email,
        password: formValues.password,
      })
      .then(() => navigate("/"))
      .catch(error => {
        if (isMounted) {
          setErrorMessage(error.message)
        }
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

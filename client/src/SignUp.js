import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState([])

  const { username, password } = formData

  const handleSubmit = e => {
    e.preventDefault()
    const user = {
      username,
      password
    }

    fetch('/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(user => navigate(`/users/${user.id}`))
        } else {
          r.json().then(data => setErrors(Object.entries(data.errors)))
        }
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={username} 
          onChange={handleChange} />
        <label>Password</label>
        <input type='password'
          name='password'
          value={password}
          onChange={handleChange} />
        <input type='submit' value='Sign up' />
      </form>
      {errors ? errors.map(error => <div> {error[0]} {error[1]} </div>) : null}
    </div>
  )
}

export default SignUp
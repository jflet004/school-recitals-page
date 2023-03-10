import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './context/user'

const SignUp = () => {

  const {setCurrentUser} = useContext(UserContext)

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

    fetch('/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(r => {
        if (r.ok) {
          r.json().then(user => {
            setCurrentUser(user)
            navigate('/profile')
          })
        } else {
          r.json().then(data => {
            setErrors(data.errors)
            console.log(data)
        })
      }})
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <br/>
        <input 
          type='text'
          name='username'
          value={username} 
          onChange={handleChange} />
          <br/>
        <label>Password</label>
          <br/>
        <input type='password'
          name='password'
          value={password}
          onChange={handleChange} />
          <br/>
        <input type='submit' value='Sign up' />
          <br/>
      </form>
      {errors ? errors.map(error => <li key={error}>{error}</li>) : null}
    </div>
  )
}

export default SignUp

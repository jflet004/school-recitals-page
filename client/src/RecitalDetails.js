import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UserContext } from './context/user'

const RecitalDetails = ({ deleteRecital }) => {

  const { currentUser } = useContext(UserContext)
  const [recital, setRecital] = useState([])
  const [quantity, setQuantity] = useState(1)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`/recitals/${params.id}`)
      .then(r => {
        if (r.ok) {
          r.json().then(data => {
            setRecital(data)
            // setLoading(false)
          })
        } else {
          r.json().then(data => console.log(data.errors))
        }
      })
  }, [])

  const handleDelete = () => {
    fetch(`/recitals/${params.id}`, {
      method: "DELETE"
    })
      .then(r => {
        if (r.ok) {
          deleteRecital(id)
          navigate('/recitals')
        } else {
          r.json().then(data => console.log(data))
        }
      })
  }

  
  const handleBuyClick = () => {
    const ticket = {
      recital_id: id,
      user_id: currentUser.id,
      price: 30.50,
      quantity: quantity
    }

    fetch(`/tickets/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket)
    })
      .then(res => {
        if (res.ok) {
          navigate('/profile')
        } else {
          res.json().then(data => console.log(data)
          )
        }
      })
  }

  const { id, title, description } = recital

  const handleQuantityChange = e => {
    if(e.target.value <= recital.tickets_left) {
      setQuantity(e.target.value)
    } else {
      alert(`Only ${e.target.value - 1} tickets available`)
    }
  }

  if(!currentUser) return <h1>Loading</h1>

  return (
    <div>
      <h1>{title}</h1>
      <h3>{description}</h3>
      <h5>Students Performing:</h5>
      <label>Quantity:</label> <input type="number" min="1" max="5" value={quantity} onChange={handleQuantityChange} />
      
      {recital.tickets_left > 0 ? <button onClick={handleBuyClick}>Buy Tickets</button> : "Sold Out"}
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default RecitalDetails

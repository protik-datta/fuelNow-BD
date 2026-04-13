import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Booking = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    division: "",
    district: "",
    address: "",
    fuelType: "petrol",
    quantity: 1,
    deliveryType: "same_day",
  })
  return (
    <div>

    </div>
  )
}

export default Booking

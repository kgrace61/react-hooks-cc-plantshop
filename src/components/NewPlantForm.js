import React, { useState } from "react";

function NewPlantForm({ addPlant }) {

  const initialForm = { //creates intial empty form
    name: "",
    image: "",
    price: 0,
  }
  const [form, setForm] = useState(initialForm) //sets state for the form

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:6001/plants", {
      method: 'POST',
      headers:{"Content-Type": "Application/JSON"},
      body: JSON.stringify(form)
    })
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        console.error('error')
      }
    })
    .then(data => {
      addPlant(data)
      setForm(initialForm)
    })
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => handleChange(e)} value={form.name} name="name" placeholder="Plant name" />
        <input type="text" onChange={(e) => handleChange(e)} value={form.image} name="image" placeholder="Image URL" />
        <input type="number" onChange={(e) => handleChange(e)} value={form.price} name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;

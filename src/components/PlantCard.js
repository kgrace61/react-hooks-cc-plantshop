import React, { useState } from "react";

function PlantCard({ plant, deletePlant, updatePlant }) { 

  const [soldOut, setSoldOut] = useState(true)
  const [updatePrice, setUpdatePrice] = useState(plant.price)

  const handleClick = () => {
    setSoldOut(prev => !prev)
  }

  const handleDelete = () =>{
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'DELETE'
    })
    .then(res => {
      if(res.ok){
        return res.json()
      }else {
        console.error('error deleting plant')
      }
    })
    .then(() => deletePlant(plant.id))
  }

   const handlePlantSubmit= (e) => {
      e.preventDefault();
      fetch(`http://localhost:6001/plants/${plant.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: updatePrice }),
      })
      .then(res => {
        if(res.ok) {
          return res.json()
        } else {
          console.error('error updating plant')
        }
      })
        .then(data => updatePlant(data))
      }
    
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {soldOut ? (
        <button onClick={() => handleClick()} className="primary">In Stock</button>
      ) : (
        <button onClick={() => handleClick()}>Out of Stock</button>
      )}
      <button onClick={() => handleDelete()}>Delete</button>
      <form onSubmit={handlePlantSubmit}>
        <input type="number" onChange={(e) => setUpdatePrice(e.target.value)} value={updatePrice} name="price" step="0.01" placeholder="Price" />
        <button onClick={() => handlePlantSubmit()} type="submit">Update Price</button>
      </form>
      
    </li>
  );
}

export default PlantCard;

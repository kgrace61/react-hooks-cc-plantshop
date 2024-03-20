import React, { useState } from "react";

function PlantCard({ plant, deletePlant }) { 

  const [soldOut, setSoldOut] = useState(true)

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

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {soldOut ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick={() => handleDelete()}>Delete</button>
    </li>
  );
}

export default PlantCard;

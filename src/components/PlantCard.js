import React, { useState } from "react";

//out of stock button
//click event handler
//state, update state
//toggle b/t in stock and sold out 


function PlantCard({ plant }) { //takes in item(plant) from PlantList and fills card with correct info

  const [soldOut, setSoldOut] = useState(true)

  const handleClick = () => {
    setSoldOut(prev => !prev)
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
      <button onClick={(e)=> console.log(e)}>Delete</button>
    </li>
  );
}

export default PlantCard;

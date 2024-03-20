import React, { useState, useEffect }  from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState ('')


  useEffect(() => { 
    fetch("http://localhost:6001/plants")
    .then(response => {
      if(response.ok){
        return response.json()
      } else {
        console.error('Could not fetch data')
      }
    })
    .then(data => setPlants(data))
  }, [])

  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant])
  }
  function updateSearch(newSearch){
    setSearch(newSearch)
  }

  const displayedPlants = plants.filter((plant) => {
    return plant.name.toString().toLowerCase().includes(search.toLowerCase());
  });

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search search={search} updateSearch={updateSearch}/>
      <PlantList plants={displayedPlants} />
    </main>
  );
}

export default PlantPage;

import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

handleChangeType = (e) => {
    this.setState({
      filters: {
      type: e.target.value
      }
    })
  }
  fetchPets = async () => {
    if(this.state.filters.type === "all"){
      let response = await fetch("/api/pets")
      let data = await response.json()
      this.setState({
        pets : data
      },()=> console.log(this.state))
    }else{
      let response = await fetch("/api/pets?type=" + this.state.filters.type)
      let data = await response.json()
      this.setState({
        pets : data
      },()=> console.log(this.state))

    }
  }
  handleAdoptPet = (id) => {
    
    this.setState(previousState => ({
       pets: previousState.pets.map(
         x => x.id === id ? Object.assign(x, {isAdopted: true}) : x)
    },()=> console.log(this.state)))

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

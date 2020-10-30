import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    return <div className="ui cards">{this.props.pets.map(x => <Pet key={x.id} pet={x} onAdoptPet={this.props.onAdoptPet}></Pet>)}</div>
  }
}

export default PetBrowser

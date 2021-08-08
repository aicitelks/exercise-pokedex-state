import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button';
import './pokedex.css';

class Pokedex extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      pokemonIndex: 0,
      filteredType: 'all',
    };
  }

  filterPokemons(filteredType) {
    this.setState({ filteredType, pokemonIndex: 0 }
    );
  }

  nextPokemon(numberOfPokemons) {
    this.setState( state => ({
      pokemonIndex: (state.pokemonIndex + 1) % numberOfPokemons,
    }) );
  }

  fetchFilteredPokemons() {
    const { pokemons } = this.props;
    const { filteredType } = this.state;

    return pokemons.filter( (pokemon) => {
      if (filteredType === 'all') return true;
      return pokemon.type === filteredType;
    } );
  }

  fetchPokemonTypes() {
    const { pokemons } = this.props;

    // o que está acontecendo neste retorno? O que é esse ...new Set
    return [...new Set(pokemons.reduce( (types, { type } ) => [...types, type], [] ))];
  }


  render() {
    const filteredPokemons = this.fetchFilteredPokemons();
    const pokemonTypes = this.fetchPokemonTypes();
    // porque está passando o parâmentro para a função entre colchetes e não entre parênteses?
    const pokemon = filteredPokemons[this.state.pokemonIndex];

    return (
      <div className="pokedex">
        {/* {this.props.pokemons.map(pokemon => <Pokemon key={pokemon.id} pokemon={pokemon} />)} */}

        <Pokemon pokemon={ pokemon } />

        <div className="pokedex-buttons-panel">

          <Button 
            onClick={ () => this.filterPokemons('all') }
            className="filter-button"
          >
            ALL
          </Button>

          { pokemonTypes.map( (type) => (
            <Button
              key={ type }
              onClick={ () => this.filterPokemons(type) }
              className="filter-button"
            >
              { type }
            </Button>
          ) ) }
        </div>

        <Button
          onClick={ () => this.nextPokemon(filteredPokemons.length) }
          disable={ filteredPokemons.length <= 1 }
          className="pokedex-button"
        >
          Próximo Pokémon
        </Button>
      </div>
    );
  }
}

export default Pokedex;

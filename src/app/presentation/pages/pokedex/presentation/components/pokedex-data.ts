import { PokemonModel } from '../../../../../domain/models'

export const pokemonListMock: Array<PokemonModel> = [
  {
    id: 1,
    name: 'bulbasaur',
    sprite: {
      other: {
        officialArtwork: {
          frontDefault:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
        }
      }
    },
    types: [
      {
        name: 'grass'
      },
      {
        name: 'poison'
      }
    ]
  },
  {
    id: 2,
    name: 'ivysaur',
    sprite: {
      other: {
        officialArtwork: {
          frontDefault:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png'
        }
      }
    },
    types: [
      {
        name: 'grass'
      },
      {
        name: 'poison'
      }
    ]
  },
  {
    id: 3,
    name: 'venusaur',
    sprite: {
      other: {
        officialArtwork: {
          frontDefault:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png'
        }
      }
    },
    types: [
      {
        name: 'grass'
      },
      {
        name: 'poison'
      }
    ]
  }
]

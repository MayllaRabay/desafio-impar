import { PokemonModel } from 'app/domain/models'

export const pokemonListMock: Array<PokemonModel> = [
  {
    id: 1,
    name: 'bulbasaur',
    sprites: {
      other: {
        dream_world: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
        }
      }
    },
    types: [
      {
        type: {
          name: 'grass'
        }
      },
      {
        type: {
          name: 'poison'
        }
      }
    ]
  },
  {
    id: 2,
    name: 'ivysaur',
    sprites: {
      other: {
        dream_world: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png'
        }
      }
    },
    types: [
      {
        type: {
          name: 'grass'
        }
      },
      {
        type: {
          name: 'poison'
        }
      }
    ]
  },
  {
    id: 3,
    name: 'venusaur',
    sprites: {
      other: {
        dream_world: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png'
        }
      }
    },
    types: [
      {
        type: {
          name: 'grass'
        }
      },
      {
        type: {
          name: 'poison'
        }
      }
    ]
  }
]

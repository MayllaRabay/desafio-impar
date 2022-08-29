import { atom } from 'recoil'

export const pokedexState = atom({
  key: 'pokedexStateKey',
  default: {
    mainError: undefined,
    isLoading: false,

    pokemonList: [],

    search: '',
    searchList: []
  }
})

import { atom } from 'recoil'

export const pokedexState = atom({
  key: 'pokedexState',
  default: {
    mainError: undefined,
    isLoading: false,

    pokemonList: [],

    search: '',
    searchList: []
  }
})

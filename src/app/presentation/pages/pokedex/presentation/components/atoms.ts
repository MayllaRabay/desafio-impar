import { atom } from 'recoil'

export const pokedexState = atom({
  key: 'pokedexStateKey',
  default: {
    mainError: undefined,
    isLoading: false,

    pokemonList: [],

    search: '',
    searchList: [],

    pageOffset: 0,
    pageActive: 1,
    havePreviousPage: false,
    haveNextPage: true,
    pages: [1, 2, 3, 4, 5]
  }
})

import { BackgroundPokemon, ThumbHeader } from 'app/presentation/assets'
import { Header, InputSearch, Loading } from 'app/presentation/components'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { NoSearchResults, pokedexState, PokemonCard, pokemonListMock } from './components'
import Styles from './pokedex-styles.module.scss'

const Pokedex: React.FC = () => {
  const [state, setState] = useRecoilState(pokedexState)

  const loadPokemons = async () => {
    try {
      setState(old => ({ ...old, isLoading: true }))
      const response = await fetch('https://pokeapi.co/api/v2/pokemon')

      console.log('response', response)
    } catch (error) {
      console.log(error.message)
    } finally {
      setState(old => ({ ...old, isLoading: true }))
    }
  }

  useEffect(() => {
    if (state.search === '') return setState(old => ({ ...old, searchList: [] }))

    setState(old => ({ ...old, searchList: [] }))
    const searchedItems = []
    state.pokemonList.forEach(pokemon => {
      if (pokemon.name.toLowerCase().includes(state.search.toLowerCase())) {
        searchedItems.push(pokemon)
      }
    })
    setState(old => ({ ...old, searchList: searchedItems }))
  }, [state.search])

  useEffect(() => {
    setState(old => ({
      ...old,
      pokemonList: pokemonListMock
    }))
  }, [])

  return (
    <>
      <Header title="Pokédex" icon={ThumbHeader} />
      <div className={Styles.mainContainer}>
        <div className={Styles.searchContainer}>
          <InputSearch
            name="search"
            type="text"
            state={state}
            setState={setState}
            placeholder="Buscar pokémons"
            width="100%"
          />
          <img src={BackgroundPokemon} alt="" />
        </div>
        <div className={Styles.cardWrapper}>
          {state.isLoading ? (
            <>
              <Loading />
            </>
          ) : state.search && state.searchList.length === 0 ? (
            <>
              <NoSearchResults />
            </>
          ) : state.search && state.searchList.length > 0 ? (
            state.searchList.map(pokemon => {
              return <PokemonCard key={pokemon.id} pokemon={pokemon} />
            })
          ) : (
            state.pokemonList.map(pokemon => {
              return <PokemonCard key={pokemon.id} pokemon={pokemon} />
            })
          )}
        </div>
      </div>
    </>
  )
}

export default Pokedex

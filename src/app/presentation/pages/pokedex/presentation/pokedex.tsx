import { BackgroundPokemon, ThumbHeader } from 'app/presentation/assets'
import { Header, InputSearch, Loading } from 'app/presentation/components'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { NoSearchResults, pokedexState, PokemonCard } from './components'
import Styles from './pokedex-styles.module.scss'

const Pokedex: React.FC = () => {
  const [state, setState] = useRecoilState(pokedexState)

  const loadPokemons = async () => {
    try {
      setState(old => ({ ...old, isLoading: true }))
      const requestPokemons = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json'
        }
      })
      const responsePokemons = await requestPokemons.json()

      const pokemons = []
      responsePokemons.results.forEach(item => {
        pokemons.push(item.url)
      })

      const requestPokemonsData = await Promise.all(pokemons.map(pkmon => fetch(pkmon)))
      const responsePokemonsData = await Promise.all(requestPokemonsData.map(pkmon => pkmon.json()))
      console.log('responsePokemonsData', responsePokemonsData)
      // const requestOnePokemon = await fetch(pokemons[15])
      // const onePokemon = await requestOnePokemon.json()

      setState(old => ({
        ...old,
        pokemonList: responsePokemonsData
      }))
    } catch (error) {
      console.log(error.message)
    } finally {
      setState(old => ({ ...old, isLoading: false }))
    }
  }

  useEffect(() => {
    if (state.search === '') return setState(old => ({ ...old, searchList: [] }))

    setState(old => ({ ...old, searchList: [] }))
    const searchedItems = []
    state.pokemonList.forEach(pokemon => {
      if (pokemon?.name?.toLowerCase().includes(state.search.toLowerCase())) {
        searchedItems.push(pokemon)
      }
    })
    setState(old => ({ ...old, searchList: searchedItems }))
  }, [state.search])

  useEffect(() => {
    loadPokemons()
  }, [])

  return (
    <div className={Styles.mainContainer}>
      <Header title="Pokédex" icon={ThumbHeader} />
      <div className={Styles.contentContainer}>
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
              return <PokemonCard key={pokemon?.id} pokemon={pokemon} />
            })
          ) : (
            state.pokemonList.map(pokemon => {
              return <PokemonCard key={pokemon?.id} pokemon={pokemon} />
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default Pokedex

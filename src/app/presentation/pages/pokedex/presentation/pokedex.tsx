import { Arrow, BackgroundPokemon, ThumbHeader } from 'app/presentation/assets'
import { Header, InputSearch, Loading } from 'app/presentation/components'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { NoSearchResults, pokedexState, PokemonCard } from './components'
import Styles from './pokedex-styles.module.scss'

export enum LocalStorageKey {
  PageOne = 0,
  PageTwo = 20,
  PageThree = 40
}

const Pokedex: React.FC = () => {
  const [state, setState] = useRecoilState(pokedexState)

  const loadPokemons = async (pageOffset: number) => {
    try {
      setState(old => ({ ...old, isLoading: true }))
      const requestPokemons = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${pageOffset}&limit=20`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-type': 'application/json'
          }
        }
      )
      const responsePokemons = await requestPokemons.json()

      const pokemons = []
      responsePokemons.results.forEach(item => {
        pokemons.push(item.url)
      })

      const requestPokemonsData = await Promise.all(pokemons.map(pkmon => fetch(pkmon)))
      const responsePokemonsData = await Promise.all(requestPokemonsData.map(pkmon => pkmon.json()))

      const finalPokemonList = []
      responsePokemonsData.forEach(pkmon => {
        finalPokemonList.push({
          id: pkmon.id,
          name: pkmon.name,
          sprite: pkmon.sprites.other.dream_world.front_default,
          types: pkmon.types
        })
      })
      setState(old => ({
        ...old,
        pokemonList: finalPokemonList,
        pageOffset
      }))
      if (pageOffset <= 40) {
        localStorage.setItem(`pokemons${pageOffset}`, JSON.stringify(finalPokemonList))
      }
    } catch (error) {
      //TODO: fazer tratamento de erro de internet e erro inesperado
      console.log(error.message)
    } finally {
      setState(old => ({ ...old, isLoading: false }))
    }
  }

  const handlePreviousPage = () => {
    console.log('previousPageButton')
    setState(old => ({ ...old, pageActive: state.pageActive - 1 }))
    handleCheckLocalStoragePokemons(state.pageOffset - 20)
  }

  const handleNextPage = () => {
    console.log('nextPageButton')
    setState(old => ({ ...old, pageActive: state.pageActive + 1 }))
    handleCheckLocalStoragePokemons(state.pageOffset + 20)
  }

  const handleCheckLocalStoragePokemons = (pageOffset: number) => {
    if (pageOffset > 40) return loadPokemons(pageOffset)

    const pokemons = JSON.parse(localStorage.getItem(`pokemons${pageOffset}`))
    if (pokemons) {
      console.log('usando o localStorage')
      setState(old => ({
        ...old,
        pokemonList: pokemons,
        pageOffset
      }))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      loadPokemons(pageOffset)
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
    setState(old => ({ ...old, pageActive: 1 }))
    handleCheckLocalStoragePokemons(0)
    // localStorage.clear()
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
      {(!state.haveNextPage && !state.havePreviousPage) ||
      (state.searchList.length > 0 && state.searchList.length <= 20) ||
      (state.search && state.searchList.length === 0) ||
      state.isLoading ? null : (
        <footer>
          {state.pageActive > 1 ? (
            <div className={Styles.previousPageButton} onClick={handlePreviousPage}>
              <img src={Arrow} alt="" />
            </div>
          ) : (
            <div className={Styles.emptyPageButton} />
          )}
          <h4>{state.pageActive}</h4>
          {state.haveNextPage ? (
            <div className={Styles.nextPageButton} onClick={handleNextPage}>
              <img src={Arrow} alt="" />
            </div>
          ) : (
            <div className={Styles.emptyPageButton} />
          )}
        </footer>
      )}
    </div>
  )
}

export default Pokedex

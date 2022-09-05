import { PokemonModel } from "app/domain/models"
import { PokeApiBaseUrl, PokeApiConfig } from "app/domain/usecases"
import { Arrow, BackgroundPokemon, ThumbHeader } from "app/presentation/assets"
import { Header, InputSearch, Loading, NoSearchResults } from "app/presentation/components"
import debounce from "lodash.debounce"
import React, { useEffect, useMemo } from "react"
import { useRecoilState, useResetRecoilState } from "recoil"
import { pokedexState, PokemonCard } from "./components"
import Styles from "./pokedex-styles.module.scss"

interface Props {
  paramsPage?: number
}

const Pokedex: React.FC<Props> = ({ paramsPage }) => {
  const [state, setState] = useRecoilState(pokedexState)
  const resetState = useResetRecoilState(pokedexState)

  const finalPokemonList = (pokemonList): Array<PokemonModel> => {
    const finalPokemonList = []
    pokemonList.forEach(pkmon => {
      const types = []
      pkmon.types.forEach(type => {
        types.push({
          name: type.type.name,
          url: type.type.url
        })
      })
      const stats = []
      pkmon.stats.forEach(stat => {
        stats.push({
          name: stat.stat.name,
          value: stat.base_stat,
          EV: stat.effort
        })
      })
      const abilities = []
      pkmon.abilities.forEach(ability => {
        abilities.push({
          name: ability.ability.name,
          url: ability.ability.url,
          is_hidden: ability.is_hidden
        })
      })
      finalPokemonList.push({
        id: pkmon.id,
        name: pkmon.name,
        sprite:
          pkmon.sprites.other.dream_world.front_default ??
          pkmon.sprites.other["official-artwork"].front_default ??
          pkmon.sprites.other.home.front_default,
        types,
        abilities,
        stats,
        height: pkmon.height / 10,
        weight: pkmon.weight / 10
      })
    })
    return finalPokemonList
  }

  const loadPokemons = async (pageOffset: number) => {
    try {
      setState(old => ({ ...old, isLoading: true }))
      const requestPokemons = await fetch(
        `${PokeApiBaseUrl}pokemon/?offset=${pageOffset}&limit=20`,
        PokeApiConfig
      )
      const responsePokemons = await requestPokemons.json()
      const pokemons = []
      responsePokemons.results.forEach(pkmon => {
        pokemons.push(pkmon.url)
      })

      const requestPokemonsData = await Promise.all(pokemons.map(pkmon => fetch(pkmon)))
      const responsePokemonsData = await Promise.all(requestPokemonsData.map(pkmon => pkmon.json()))
      const pokemonList = finalPokemonList(responsePokemonsData)
      setState(old => ({
        ...old,
        pokemonList,
        pageOffset
      }))
      if (pageOffset <= 40) {
        sessionStorage.setItem(`pokemons${pageOffset}`, JSON.stringify(pokemonList))
      }
    } catch (error) {
      //TODO: fazer tratamento de erro de internet e erro inesperado
      console.error("loadPokemons ERROR: ", error.message)
    } finally {
      setState(old => ({ ...old, isLoading: false }))
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePreviousPage = () => {
    setState(old => ({
      ...old,
      pageActive: state.pageActive - 1,
      pageOffset: state.pageOffset - 20
    }))
    handleCheckLocalStoragePokemons(state.pageOffset - 20)
  }

  const handleNextPage = () => {
    setState(old => ({
      ...old,
      pageActive: state.pageActive + 1,
      pageOffset: state.pageOffset + 20
    }))
    handleCheckLocalStoragePokemons(state.pageOffset + 20)
  }

  const handleSelectPage = (pageNumber: number) => {
    if (pageNumber === state.pageActive) return
    setState(old => ({
      ...old,
      pageActive: pageNumber,
      pageOffset: pageNumber * 20 - 20
    }))
    handleCheckLocalStoragePokemons(pageNumber * 20 - 20)
  }

  const updatePageNavigation = (pageActive: number) => {
    if (pageActive < 5) {
      return setState(old => ({
        ...old,
        pages: [1, 2, 3, 4, 5],
        isLastPages: false,
        haveNextPage: true
      }))
    }
    if (pageActive === state.lastPage) {
      return setState(old => ({
        ...old,
        pages: [
          state.lastPage - 4,
          state.lastPage - 3,
          state.lastPage - 2,
          state.lastPage - 1,
          state.lastPage
        ],
        haveNextPage: false
      }))
    }
    if (pageActive >= state.lastPage - 3) {
      return setState(old => ({
        ...old,
        pages: [
          state.lastPage - 4,
          state.lastPage - 3,
          state.lastPage - 2,
          state.lastPage - 1,
          state.lastPage
        ],
        isLastPages: true
      }))
    }
    const page = pageActive
    setState(old => ({
      ...old,
      pages: [page - 3, page - 2, page - 1, page, page + 1, page + 2, page + 3],
      isLastPages: false,
      haveNextPage: true
    }))
  }

  const handleCheckLocalStoragePokemons = (pageOffset: number) => {
    if (pageOffset > 40) return loadPokemons(pageOffset)

    const pokemons = JSON.parse(sessionStorage.getItem(`pokemons${pageOffset}`))
    if (pokemons) {
      setState(old => ({
        ...old,
        pokemonList: pokemons,
        pageOffset
      }))
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      loadPokemons(pageOffset)
    }
  }

  const handleSearchPokemons = async (search: string, allPokemons: Array<any>) => {
    try {
      setState(old => ({ ...old, isLoading: true }))
      const searchedPokemons = []
      allPokemons.forEach(pkmon => {
        if (pkmon.name?.toLowerCase().includes(search?.toLowerCase())) {
          searchedPokemons.push(pkmon.url)
        }
      })
      const requestPokemonsData = await Promise.all(searchedPokemons.map(pkmon => fetch(pkmon)))
      const responsePokemonsData = await Promise.all(requestPokemonsData.map(pkmon => pkmon.json()))
      const searchList = finalPokemonList(responsePokemonsData)
      setState(old => ({
        ...old,
        searchList
      }))
    } catch (error) {
      //TODO: fazer tratamento de erro de internet e erro inesperado
      console.error("handleSearchPokemons ERROR: ", error.message)
    } finally {
      setState(old => ({ ...old, isLoading: false }))
    }
  }

  const handleSearchWithDebounce = useMemo(() => {
    return debounce(
      (search: string, allPokemons: Array<any>) => handleSearchPokemons(search, allPokemons),
      1000
    )
  }, [])

  const handleSearch = () => {
    if (state.search === "" || state.search.length < 3) {
      return setState(old => ({ ...old, searchList: [] }))
    }
    setState(old => ({ ...old, isLoading: true, searchList: [] }))
    handleSearchWithDebounce(state.search, state.allPokemons)
  }

  const getInitialStates = async () => {
    try {
      setState(old => ({ ...old, loading: true }))
      const request = await fetch(`${PokeApiBaseUrl}pokemon/?offset=0&limit=1`, PokeApiConfig)
      const response = await request.json()
      const pokemonCount = response.count
      const lastPage = Math.ceil(pokemonCount / 20)
      const requestAllPokemons = await fetch(
        `${PokeApiBaseUrl}pokemon/?offset=0&limit=${pokemonCount}`,
        PokeApiConfig
      )
      const responseAllPokemons = await requestAllPokemons.json()
      const allPokemons = responseAllPokemons.results
      let pageActive: number
      if (paramsPage) {
        if (paramsPage > lastPage) {
          pageActive = lastPage
        } else {
          pageActive = paramsPage
        }
      } else {
        pageActive = state.pageActive
      }
      setState(old => ({ ...old, pokemonCount, lastPage, allPokemons, pageActive }))
      updatePageNavigation(pageActive)
      handleCheckLocalStoragePokemons(pageActive * 20 - 20)
    } catch (error) {
      //TODO: fazer tratamento de erro de internet e erro inesperado
      console.error("getInitialStates ERROR: ", error.message)
    } finally {
      setState(old => ({ ...old, loading: false }))
    }
  }

  useEffect(() => {
    if (state.search === "" || state.search.length < 3)
      return setState(old => ({ ...old, searchList: [] }))
  }, [state.search])

  useEffect(() => {
    updatePageNavigation(state.pageActive)
  }, [state.pageActive])

  useEffect(() => {
    resetState()
    getInitialStates()
  }, [])

  return (
    <div className={Styles.mainContainer}>
      <Header title="Pokédex" icon={ThumbHeader} />
      <div className={Styles.contentContainer}>
        <div className={Styles.searchContainer}>
          <InputSearch
            handleSearch={handleSearch}
            name="search"
            type="text"
            state={state}
            setState={setState}
            placeholder="Buscar pokémons"
            width="100%"
          />
          <img src={BackgroundPokemon} alt="" />
        </div>
        <div className={Styles.cardContainer}>
          {state.search && state.searchList.length > 0 && <h4>Resultado da busca</h4>}
          <div className={Styles.cardWrapper}>
            {state.isLoading ? (
              <Loading height="60vh" />
            ) : state.search.length >= 3 && state.searchList.length === 0 ? (
              <NoSearchResults height="60vh" />
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
      {state.searchList.length > 0 ||
      state.pokemonList.length === 0 ||
      (state.search && state.searchList.length === 0) ||
      state.isLoading ? null : (
        <footer>
          <div className={Styles.footerMainButtons}>
            {state.pageActive > 1 ? (
              <div className={Styles.previousPageButton} onClick={handlePreviousPage}>
                <img src={Arrow} alt="" />
              </div>
            ) : (
              <div className={Styles.emptyPageButton} />
            )}
            <div className={Styles.allPageButtons}>
              {state.pages[0] !== 1 && <span>...</span>}
              {state.pages?.map(page => {
                return (
                  <span
                    key={page}
                    className={Styles.pageButton}
                    onClick={() => handleSelectPage(page)}
                    data-style={page === state.pageActive && "pageActive"}
                  >
                    {page}
                  </span>
                )
              })}
              {state.haveNextPage && !state.isLastPages && <span>...</span>}
            </div>
            {state.haveNextPage ? (
              <div className={Styles.nextPageButton} onClick={handleNextPage}>
                <img src={Arrow} alt="" />
              </div>
            ) : (
              <div className={Styles.emptyPageButton} />
            )}
          </div>
          {state.pageActive >= 5 && (
            <div onClick={() => handleSelectPage(1)} className={Styles.backToPageOneButton}>
              <p>Voltar à página 1</p>
            </div>
          )}
        </footer>
      )}
    </div>
  )
}

export default Pokedex

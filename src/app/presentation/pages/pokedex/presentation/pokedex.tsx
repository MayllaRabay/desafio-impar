import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { BackgroundPokemon, ThumbHeader } from '../../../../presentation/assets'
import { Header, InputSearch } from '../../../components'
import { pokedexState, PokemonCard, pokemonListMock } from './components'
import Styles from './pokedex-styles.module.scss'

const Pokedex: React.FC = () => {
  const [state, setState] = useRecoilState(pokedexState)

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
          {state.pokemonList.map(pokemon => {
            return <PokemonCard key={pokemon.id} pokemon={pokemon} />
          })}
        </div>
      </div>
    </>
  )
}

export default Pokedex

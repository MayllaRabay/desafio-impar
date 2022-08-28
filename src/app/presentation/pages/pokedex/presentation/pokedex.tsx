import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { pokedexState, pokemonListMock } from './components'
import Styles from './pokedex-styles.scss'

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
      {/* <Header /> */}
      <div className={Styles.mainContainer}>
        Aqui estará o conteúdo principal
        {/* {state.pokemonList.map(pokemon => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />
        })} */}
      </div>
    </>
  )
}

export default Pokedex

import { PokemonModel } from 'app/domain/models'
import { PokemonType } from 'app/presentation/pages/pokedex/presentation/components'
import React from 'react'
import Styles from './pokemon-card-styles.module.scss'

interface Props {
  pokemon: PokemonModel
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const pokemonSprite = pokemon?.sprites?.other?.dream_world?.front_default
  return (
    <div className={Styles.cardContainer}>
      <div className={Styles.cardId}>{`#${pokemon?.id}`}</div>
      <div className={Styles.cardImage}>
        <img src={pokemonSprite} alt={`Imagem de ${pokemon?.name}`} />
      </div>
      <div className={Styles.cardTitle}>
        {pokemon?.name[0]?.toUpperCase() + pokemon?.name?.slice(1).toLowerCase()}
      </div>
      <div className={Styles.cardInfo}>
        {pokemon?.types?.map((type, index) => {
          return <PokemonType key={index} type={type?.type} />
        })}
      </div>
    </div>
  )
}

export default PokemonCard

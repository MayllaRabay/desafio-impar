import React from 'react'
import { PokemonType } from '..'
import { PokemonModel } from '../../../../../../domain/models'
import Styles from './pokemon-card-styles.module.scss'

interface Props {
  pokemon: PokemonModel
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const pokemonSprite = pokemon.sprite.other.officialArtwork.frontDefault
  return (
    <div className={Styles.cardContainer}>
      <div className={Styles.cardId}>{`#${pokemon.id}`}</div>
      <div className={Styles.cardImage}>
        <img src={pokemonSprite} alt={`Imagem de ${pokemon.name}`} />
      </div>
      <div className={Styles.cardTitle}>
        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1).toLowerCase()}
      </div>
      <div className={Styles.cardInfo}>
        {pokemon.types.map((type, index) => {
          return <PokemonType key={index} type={type} />
        })}
      </div>
    </div>
  )
}

export default PokemonCard

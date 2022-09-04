import { PokemonModel } from "app/domain/models"
import React from "react"
import Styles from "./pokemon-more-info-styles.module.scss"

interface Props {
  pokemon: PokemonModel
}

const PokemonMoreInfo: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className={Styles.mainContainer}>
      <h3>{pokemon.name.toUpperCase()}</h3>
      <div className={Styles.statsContainer}>
        <div className={Styles.spriteContainer}>
          <div className={Styles.spriteWrapper}>
            <img src={pokemon.sprite} alt="" />
            <span>{pokemon.weight}kg</span>
          </div>
          <span>{pokemon.height}m</span>
        </div>
        <div className={Styles.statsWrapper}>
          <h4>Status</h4>
          {pokemon.stats.map(stat => (
            <div key={stat.name}>
              <span>{stat.name}</span>
              <span> - {stat.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={Styles.abilitiesContainer}>
        <h4>Habilidades</h4>
        {pokemon.abilities.map(ability => (
          <div key={ability.name}>
            <span>{ability.name}</span>
            {ability.is_hidden && <span> - habilidade escondida</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PokemonMoreInfo

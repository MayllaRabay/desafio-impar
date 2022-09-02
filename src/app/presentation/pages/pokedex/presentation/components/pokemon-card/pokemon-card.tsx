import { PokemonModel } from "app/domain/models"
import { ThumbDitto } from "app/presentation/assets"
import { PokemonType } from "app/presentation/pages/pokedex/presentation/components"
import React from "react"
import Styles from "./pokemon-card-styles.module.scss"

interface Props {
  pokemon: PokemonModel
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className={Styles.cardContainer}>
      <div className={Styles.cardId}>{`#${pokemon?.id}`}</div>
      <div className={Styles.cardImage}>
        {!pokemon?.sprite ? (
          <div className={Styles.imageNotFound}>
            <img src={ThumbDitto} alt={`Imagem de ${pokemon?.name} não encontrada`} />
            <p>imagem não encontrada</p>
          </div>
        ) : (
          <img src={pokemon?.sprite} alt={`Imagem de ${pokemon?.name}`} />
        )}
      </div>
      <h5 className={Styles.cardTitle}>
        {pokemon?.name[0]?.toUpperCase() + pokemon?.name?.slice(1).toLowerCase()}
      </h5>
      <div className={Styles.cardInfo}>
        {pokemon?.types?.map((type, index) => {
          return <PokemonType key={index} type={type?.type} />
        })}
      </div>
    </div>
  )
}

export default PokemonCard

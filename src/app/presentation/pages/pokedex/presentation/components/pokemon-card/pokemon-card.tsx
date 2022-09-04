import { PokemonModel } from "app/domain/models"
import { ThumbDitto } from "app/presentation/assets"
import { Modal } from "app/presentation/components"
import {
  PokemonMoreInfo,
  PokemonType
} from "app/presentation/pages/pokedex/presentation/components"
import React from "react"
import Styles from "./pokemon-card-styles.module.scss"

interface Props {
  pokemon: PokemonModel
  state: any
  setState: any
}

const PokemonCard: React.FC<Props> = ({ pokemon, state, setState }) => {
  const modal = document.getElementById(pokemon?.name + pokemon?.id)
  const handleModal = () => {
    if (modal) {
      if (modal?.style.display === "flex") {
        modal.style.display = "none"
        setState(old => ({ ...old, isModalPokemonInfoOpen: false }))
      } else {
        modal.style.display = "flex"
        setState(old => ({ ...old, isModalPokemonInfoOpen: true }))
      }
    }
  }
  return (
    <>
      <div onClick={handleModal} className={Styles.cardContainer}>
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
            return <PokemonType key={index} type={type} />
          })}
        </div>
      </div>
      <Modal
        id={pokemon?.name + pokemon?.id}
        isOpen={modal?.style.display === "flex"}
        onClose={handleModal}
      >
        <PokemonMoreInfo pokemon={pokemon} />
      </Modal>
    </>
  )
}

export default PokemonCard

import { PokemonModel } from "app/domain/models"
import { ThumbDitto } from "app/presentation/assets"
import { Modal } from "app/presentation/components"
import {
  PokemonMoreInfo,
  PokemonType
} from "app/presentation/pages/pokedex/presentation/components"
import React, { useState } from "react"
import Styles from "./pokemon-card-styles.module.scss"

interface Props {
  pokemon: PokemonModel
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  let modalDisplayStyle = document.getElementById(pokemon?.name + pokemon?.id)?.style.display
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = e => {
    e.stopPropagation()
    modalDisplayStyle = "flex"
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    modalDisplayStyle = "none"
    setIsModalOpen(false)
  }
  return (
    <>
      <div onClick={handleOpenModal} className={Styles.cardContainer}>
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
      <Modal id={pokemon?.name + pokemon?.id} isOpen={isModalOpen} onClose={handleCloseModal}>
        <PokemonMoreInfo pokemon={pokemon} />
      </Modal>
    </>
  )
}

export default PokemonCard

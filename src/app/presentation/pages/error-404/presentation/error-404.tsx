import { ThumbSnorlax } from "app/presentation/assets"
import { Button } from "app/presentation/components"
import React from "react"
import { useNavigate } from "react-router-dom"
import Styles from "./error-404-styles.module.scss"

const Error404: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigateHome = () => {
    navigate("/pokedex")
  }

  return (
    <div className={Styles.mainContainer}>
      <img src={ThumbSnorlax} alt="" />
      <h4>Desculpe mas essa página não foi encontrada.</h4>
      <Button text="Encontrar o caminho de volta" onClick={handleNavigateHome} />
    </div>
  )
}

export default Error404

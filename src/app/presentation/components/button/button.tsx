import React from "react"
import Styles from "./button-styles.module.scss"

interface Props {
  text: string
  onClick: () => void
  mainButton?: boolean
}

const Button: React.FC<Props> = ({ text, onClick, mainButton = true }) => {
  return (
    <div onClick={onClick} className={Styles.button} data-style={mainButton && "mainButton"}>
      {text}
    </div>
  )
}

export default Button

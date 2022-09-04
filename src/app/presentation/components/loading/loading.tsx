import { IconPokeball } from "app/presentation/assets"
import { Colors } from "app/presentation/styles"
import React from "react"
import Styles from "./loading-styles.module.scss"

interface Props {
  color?: string
  height?: string
  width?: string
}

const Loading: React.FC<Props> = ({ color = Colors.grayD, height = "100%", width = "100%" }) => {
  return (
    <div style={{ height: height, width: width }} className={Styles.loadingContainer}>
      <img src={IconPokeball} alt="" />
      <h4 style={{ color: color }}>Carregando</h4>
    </div>
  )
}

export default Loading

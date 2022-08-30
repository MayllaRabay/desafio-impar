import { IconPokeball } from 'app/presentation/assets'
import React from 'react'
import Styles from './loading-styles.module.scss'

const Loading: React.FC = () => {
  return (
    <div className={Styles.loadingContainer}>
      <img src={IconPokeball} alt="" />
      <h4>Carregando</h4>
    </div>
  )
}

export default Loading

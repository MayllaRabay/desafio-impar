import { IconStar } from 'app/presentation/assets'
import React from 'react'
import Styles from './loading-styles.module.scss'

const Loading: React.FC = () => {
  return (
    <div className={Styles.loadingContainer}>
      <img src={IconStar} alt="" />
      <p>Carregando</p>
    </div>
  )
}

export default Loading

import { ThumbSnorlax } from 'app/presentation/assets'
import React from 'react'
import Styles from './no-search-results-styles.module.scss'

const NoSearchResults: React.FC = () => {
  return (
    <div className={Styles.noResultContainer}>
      <img src={ThumbSnorlax} alt="" />
      <h4>Nenhum resultado</h4>
      <p>Desculpe mas não encontramos nada para você, tente uma nova busca!</p>
    </div>
  )
}

export default NoSearchResults

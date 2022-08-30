import { Colors } from 'app/presentation/styles'
import React from 'react'
import Styles from './pokemon-type-styles.module.scss'

export interface Props {
  type: any
}

const PokemonType: React.FC<Props> = ({ type }) => {
  const color =
    type?.name === 'poison' ? Colors.purpleM : type?.name === 'grass' ? Colors.greenM : Colors.grayM
  return (
    <div style={{ borderColor: color, color: color }} className={Styles.cardType}>
      {type?.name}
    </div>
  )
}

export default PokemonType

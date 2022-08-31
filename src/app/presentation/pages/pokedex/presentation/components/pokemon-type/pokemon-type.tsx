import { Colors } from 'app/presentation/styles'
import React from 'react'
import Styles from './pokemon-type-styles.module.scss'

export enum PokemonTypeName {
  Normal = 'normal',
  Fighting = 'fighting',
  Flying = 'flying',
  Poison = 'poison',
  Ground = 'ground',
  Rock = 'rock',
  Bug = 'bug',
  Ghost = 'ghost',
  Steel = 'steel',
  Fire = 'fire',
  Water = 'water',
  Grass = 'grass',
  Electric = 'electric',
  Psychic = 'psychic',
  Ice = 'ice',
  Dragon = 'dragon',
  Dark = 'dark',
  Fairy = 'fairy',
  Shadow = 'shadow'
}

export interface Props {
  type: any
}

const PokemonType: React.FC<Props> = ({ type }) => {
  const name = type?.name
  const color =
    name === PokemonTypeName.Normal
      ? Colors.grayL
      : name === PokemonTypeName.Fighting
      ? Colors.redD
      : name === PokemonTypeName.Flying
      ? Colors.blueL
      : name === PokemonTypeName.Poison
      ? Colors.purpleM
      : name === PokemonTypeName.Ground
      ? Colors.yellowM
      : name === PokemonTypeName.Rock
      ? Colors.yellowD
      : name === PokemonTypeName.Bug
      ? Colors.greenL
      : name === PokemonTypeName.Ghost
      ? Colors.grayL
      : name === PokemonTypeName.Steel
      ? Colors.grayM
      : name === PokemonTypeName.Fire
      ? Colors.redM
      : name === PokemonTypeName.Water
      ? Colors.blueM
      : name === PokemonTypeName.Grass
      ? Colors.greenM
      : name === PokemonTypeName.Electric
      ? Colors.yellowL
      : name === PokemonTypeName.Psychic
      ? Colors.purpleD
      : name === PokemonTypeName.Ice
      ? Colors.blueXL
      : name === PokemonTypeName.Dragon
      ? Colors.redD
      : name === PokemonTypeName.Dark
      ? Colors.purpleXD
      : name === PokemonTypeName.Fairy
      ? Colors.redL
      : name === PokemonTypeName.Shadow
      ? Colors.grayD
      : Colors.grayM
  return (
    <div style={{ borderColor: color, color: color }} className={Styles.cardType}>
      {type?.name}
    </div>
  )
}

export default PokemonType

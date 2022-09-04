export interface PokemonModel {
  id: number
  name: string
  sprite: string
  types: Array<PokemonTypesModel>
  abilities: Array<PokemonAbilitiesModel>
  stats: Array<PokemonStatsModel>
  height: number
  weight: number
}

export interface PokemonTypesModel {
  name: string
  url: string
}

export interface PokemonAbilitiesModel {
  name: string
  url: string
  is_hidden: boolean
}

export interface PokemonStatsModel {
  name: string
  value: number
  EV: number
}

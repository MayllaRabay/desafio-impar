export interface PokemonModel {
  id: number
  name: string
  sprite: string
  types: Array<{ type: { name: string } }>
}

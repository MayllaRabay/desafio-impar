export interface PokemonModel {
  id: number
  name: string
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  }
  types: Array<{ type: { name: string } }>
}

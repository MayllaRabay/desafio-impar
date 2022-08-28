export interface PokemonModel {
  id: number
  name: string
  sprite: {
    other: {
      officialArtwork: {
        frontDefault: string
      }
    }
  }
  types: Array<object>
}

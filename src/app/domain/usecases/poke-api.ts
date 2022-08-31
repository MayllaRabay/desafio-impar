export const PokeApiBaseUrl = 'https://pokeapi.co/api/v2/'

export const PokeApiConfig: RequestInit = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-type': 'application/json'
  }
}

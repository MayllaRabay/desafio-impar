import { Pokedex } from "app/presentation/pages"
import React from "react"
import { useSearchParams } from "react-router-dom"

export const MakePokedex: React.FC = () => {
  const [searchParams] = useSearchParams()
  const paramsPage = searchParams.get("page")

  return <Pokedex paramsPage={paramsPage && Number(paramsPage)} />
}

import { MakeError404 } from "app/presentation/pages/error-404/main/factories/pages"
import { MakePokedex } from "app/presentation/pages/pokedex/main/factories/pages"
import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { RecoilRoot } from "recoil"

const Router: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/pokedex" />} />
          <Route path="*" element={<MakeError404 />} />
          <Route path="/pokedex" element={<MakePokedex />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default Router

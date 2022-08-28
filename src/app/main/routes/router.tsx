import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Error404, Pokedex } from '../../presentation/pages'

const Router: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/pokedex" />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/pokedex" element={<Pokedex />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default Router

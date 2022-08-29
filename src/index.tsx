import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './app/main/routes/router'
import './app/presentation/styles/global-styles.module.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<Router />)

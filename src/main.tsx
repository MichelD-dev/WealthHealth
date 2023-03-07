/**
Point d'entrée de l'application.
Render le provider de l'authentification et le fournisseur de route.
@module index
*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import router from './router/router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)

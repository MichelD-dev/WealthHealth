import {Outlet} from 'react-router-dom'
import Header from '@/components/Header'

/**
Composant racine de l'application.
Affiche le composant de l'en-tête et l'élément de sortie des routes.
@component
@returns {JSX.Element} Élément racine de l'application.
*/
function App(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App

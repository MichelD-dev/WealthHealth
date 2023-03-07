import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  useLocation,
} from 'react-router-dom'
import {Suspense, lazy} from 'react'
import App from '@/App'
import Spinner from '@/components/Spinner/Spinner'
import {useAuth} from '@/context/AuthProvider'

// Chargement dynamique des composants
const Form = lazy(() => import('@/pages/Employee_creation/Creation'))
const LoginForm = lazy(() => import('@/pages/Login/Login'))
const List = lazy(() => import('@/pages/Employee_list/List'))
const Error404 = lazy(() => import('@/pages/error404/Error404'))

/**
 * Composant qui vérifie que l'utilisateur est authentifié avant de permettre l'accès à une route
 * @param {RequireAuthProps} props - Les propriétés passées au composant
 * @return {JSX.Element} - Le composant de protection d'authentification
 */
function RequireAuth({children}: {children: JSX.Element}): JSX.Element {
  const {user} = useAuth()
  const location = useLocation()

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (user === null) {
    return <Navigate to="/" state={{from: location}} replace />
  }

  // Sinon, autoriser l'accès aux routes protégées
  return children
}

// Configuration des routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index
        element={
          <Suspense fallback={<Spinner />}>
            <LoginForm />
          </Suspense>
        }
      />
      <Route
        path="create"
        element={
          <RequireAuth>
            <Suspense fallback={<Spinner />}>
              <Form />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path="list"
        element={
          <RequireAuth>
            <Suspense fallback={<Spinner />}>
              <List />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Spinner />}>
            <Error404 />
          </Suspense>
        }
      />
    </Route>,
  ),
)
export default router

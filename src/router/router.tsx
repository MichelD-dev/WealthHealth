import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import {Suspense, lazy} from 'react'
import App from '@/App'
import Spinner from '@/components/Spinner/Spinner'

const Form = lazy(() => import('@/pages/Employee_creation/Creation'))
const List = lazy(() => import('@/pages/Employee_list/List'))
const Error404 = lazy(() => import('@/pages/error404/Error404'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="create"
        element={
          <Suspense fallback={<Spinner />}>
            <Form />
          </Suspense>
        }
      />
      <Route
        index
        element={
          <Suspense fallback={<Spinner />}>
            <List />
          </Suspense>
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

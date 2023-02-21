import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import {Suspense, lazy} from 'react'
import App from '@/App'

const Form = lazy(() => import('@/pages/Employee_creation/creation'))
const LoginForm = lazy(() => import('@/pages/Login/Login'))
const List = lazy(() => import('@/pages/Employee_list/List'))
const Error404 = lazy(() => import('@/pages/error404/Error404'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index
        element={
          <Suspense
            fallback={
              <div className="w-full mt-20 flex justify-center">
                <p>Loading...</p>
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        }
      />
      <Route
        path="create"
        element={
          <Suspense
            fallback={
              <div className="w-full mt-20 flex justify-center">
                <p>Loading...</p>
              </div>
            }
          >
            <Form />
          </Suspense>
        }
      />
      <Route
        path="list"
        element={
          <Suspense
            fallback={
              <div className="w-full mt-20 flex justify-center">
                <p>Loading...</p>
              </div>
            }
          >
            <List />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense
            fallback={
              <div className="w-full mt-20 flex justify-center">
                <p>Loading...</p>
              </div>
            }
          >
            <Error404 />
          </Suspense>
        }
      />
    </Route>,
  ),
)

export default router

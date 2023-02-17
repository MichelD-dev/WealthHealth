import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Error404 from '@/pages/error404/Error404'
import Form from '@/pages/Employee_creation/creation'
import App from '@/App'
import List from '@/pages/Employee_list/List'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Form />} />
      <Route path="list" element={<List />} />
      <Route path="*" element={<Error404 />} />
    </Route>,
  ),
)

export default router

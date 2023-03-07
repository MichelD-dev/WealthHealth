import supabase from '@/config/supabaseClient'
import {NavLink, useLocation} from 'react-router-dom'

const Navbar = () => {
  const {pathname} = useLocation()

  const signOut = async () => await supabase.auth.signOut()

  return (
    <>
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          <h1 className="text-2xl no-underline text-grey-darkest hover:text-blue-dark select-none">
            HRnet
          </h1>
        </div>
        {pathname === '/create' && (
          <ul className="flex flex-row gap-5 mr-5 list-none">
            <li className="list-none">
              <NavLink
                to="/"
                className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
              >
                View Current Employees
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                onClick={signOut}
                className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
              >
                Log out
              </NavLink>
            </li>
          </ul>
        )}
        {pathname === '/list' && (
          <ul className="flex flex-row gap-5 mr-5 list-none">
            <li className="list-none">
              <NavLink
                to="/create"
                className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
              >
                Create New Employee
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                onClick={signOut}
                className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
              >
                Log out
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </>
  )
}

export default Navbar

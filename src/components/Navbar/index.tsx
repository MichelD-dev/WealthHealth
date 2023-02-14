import {NavLink, useLocation} from 'react-router-dom'

const Navbar = () => {
  const {pathname} = useLocation()

  return (
    <>
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          <a
            href="/"
            className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
          >
            HRnet
          </a>
        </div>
        <div>
          {pathname === '/' ? (
            <NavLink
              to="/list"
              className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
            >
              View Current Employees
            </NavLink>
          ) : (
            <NavLink
              to="/"
              className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
            >
              Home
            </NavLink>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar

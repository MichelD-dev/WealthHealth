/* eslint-disable react/no-unescaped-entities */
import {Link} from 'react-router-dom'

/**
Composant pour afficher la page d'erreur 404.
@returns {JSX.Element} Le composant de la page d'erreur.
*/
const Error = () => (
  <section className="flex items-center h-full p-16 text-[#96b400]">
    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div className="max-w-md text-center">
        <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
          <span className="sr-only">Error</span>404
        </h2>
        <p className="text-2xl font-semibold md:text-3xl text-gray-400">
          Sorry, we couldn't find this page.
        </p>
        <p className="mt-4 mb-8 text-gray-400">
          But dont worry, you can find plenty of other things on our homepage.
        </p>
        <Link
          to="/"
          className=" text-white bg-[#b7ce48] hover:bg-[#abc042] focus:ring-4 focus:outline-none focus:ring-[#aabe44] rounded-lg text-sm text-center px-8 py-3 font-semibold"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  </section>
)

export default Error

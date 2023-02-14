const Form = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create Employee
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="firstname"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="birthdate"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Date of birth
                </label>
                <input
                  type="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="startdate"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <fieldset className="border border-solid border-gray-300 p-3">
                <legend className="text-sm">Address</legend>
                <div>
                  <label
                    htmlFor="street"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    id="street"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    State
                  </label>

                  <div className="mb-3 xl:w-96">
                    <select
                      id="state"
                      className="form-select bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                    >
                      <option value="1">Alabama</option>
                      <option value="2">Ohio</option>
                      <option value="3">Montana</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="zipcode"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipcode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
              </fieldset>
              <div>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Department
                </label>
                <div className="mb-3 xl:w-96">
                  <select
                    id="state"
                    className="form-select bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                  >
                    <option value="1">Sales</option>
                    <option value="2">Marketing</option>
                    <option value="3">Engineering</option>
                    <option value="3">Human Ressources</option>
                    <option value="3">Legal</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Form

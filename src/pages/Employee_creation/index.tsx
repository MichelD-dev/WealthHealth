import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {EmployeeSchema, EmployeeSchemaType} from '@/types/employee.model'
import {useEffect} from 'react'

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    reset,
    formState,
    formState: {errors, isSubmitting, isSubmitSuccessful},
  } = useForm<EmployeeSchemaType>({
    resolver: zodResolver(EmployeeSchema),
  })

  useEffect(() => {
    setFocus('firstname')
  }, [setFocus])

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [formState, reset])

  const onSubmit: SubmitHandler<EmployeeSchemaType> = data => {
    console.log(data)
  }

  const address = watch('address')

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create Employee
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
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
                  className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                    errors.firstname ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('firstname')}
                />
                {errors.firstname && (
                  <span className="text-red-600 block mt-2 text-right">
                    {errors.firstname?.message}
                  </span>
                )}
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
                  className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                    errors.lastname ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('lastname')}
                />
                {errors.lastname && (
                  <span className="text-red-600 block mt-2 text-right">
                    {errors.lastname?.message}
                  </span>
                )}
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
                  className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('email')}
                />
                {errors.email && (
                  <span className="text-red-600 block mt-2 text-right">
                    {errors.email?.message}
                  </span>
                )}
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
                  className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                    errors.birthdate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('birthdate')}
                />{' '}
                {errors.birthdate && (
                  <span className="text-red-600 block mt-2 text-right">
                    {errors.birthdate?.message}
                  </span>
                )}
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
                  className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                    errors.startdate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('startdate')}
                />
                {errors.startdate && (
                  <span className="text-red-600 block mt-2 text-right">
                    {errors.startdate?.message}
                  </span>
                )}
              </div>

              <div className="flex align-bottom">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  <input
                    type="checkbox"
                    className=" w-3 h-3 mr-1 border-gray-300 focus:ring-0 focus:ring-offset-0"
                    {...register('address')}
                  />
                  <span>Address</span>
                </label>
              </div>

              {address && (
                <fieldset className="border border-solid border-gray-300 p-3">
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
                      className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                        errors.street ? 'border-red-500' : 'border-gray-300'
                      }`}
                      {...register('street', {shouldUnregister: true})}
                    />
                    {/* {errors.street && (
                      <span className="text-red-600 block mt-2 text-right">
                        {errors.street?.message}
                      </span>
                    )} */}
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
                      className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      {...register('city', {shouldUnregister: true})}
                    />
                    {/* {errors.city && (
                      <span className="text-red-600 block mt-2 text-right">
                        {errors.city?.message}
                      </span>
                    )} */}
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
                        {...register('state', {shouldUnregister: true})}
                      >
                        <option value="Alabama">Alabama</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Montana">Montana</option>
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
                      className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                        errors.zipcode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      {...register('zipcode', {shouldUnregister: true})}
                    />
                    {/* {errors.zipcode && (
                      <span className="text-red-600 block mt-2 text-right">
                        {errors.zipcode?.message}
                      </span>
                    )} */}
                  </div>
                </fieldset>
              )}
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
                    {...register('department')}
                  >
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Human Ressources">Human Ressources</option>
                    <option value="Legal">Legal</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                  isSubmitting && 'disabled'
                }`}
                disabled={isSubmitting}
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

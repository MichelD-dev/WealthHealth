import {SubmitHandler, useForm, Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {
  EmployeeSchema,
  EmployeeSchemaType,
  EmployeeWithAddressSchemaType,
} from '@/types/employee.model'
import {useCallback, useEffect, useMemo, useRef} from 'react'
import supabase from '@/config/supabaseClient'
import {useNavigate} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import convertLocalToUTCDate from '@/utils/timeconverter'
import {Modal} from '@/components/Modal'

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    reset,
    control,
    formState,
    formState: {errors, isSubmitting, isSubmitSuccessful},
  } = useForm<EmployeeWithAddressSchemaType>({
    resolver: useMemo(() => zodResolver(EmployeeSchema), [EmployeeSchema]),
  })

  useEffect(() => {
    setFocus('firstname')
  }, [setFocus])

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [formState, reset])

  const modal = useRef(null)

  const onSubmit = useCallback<SubmitHandler<EmployeeSchemaType>>(
    () => modal.current.open(),
    // async employee => {
    //   const {data, error, status} = await supabase
    //     .from('employees')
    //     .insert(employee)
    //     .select('birthdate')
    //   console.log(employee, data)
    //   if (status === 201) {
    //     navigate('/list')
    //   }

    //   if (error) {
    //     console.log(error)
    //   }
    [],
  )

  const address = watch('address')

  const navigate = useNavigate()

  return (
    <>
      <Modal ref={modal}>Hello World</Modal>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold text-[#aabe44] leading-tight tracking-tight md:text-2xl">
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
                    aria-invalid={errors.firstname ? 'true' : 'false'}
                    aria-describedby={errors.firstname && 'firstname-error'}
                    {...register('firstname')}
                  />
                  {errors.firstname && (
                    <span
                      id="firstname-error"
                      className="text-red-600 block mt-2 text-right"
                    >
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
                    aria-invalid={errors.lastname ? 'true' : 'false'}
                    aria-describedby={errors.lastname && 'lastname-error'}
                    {...register('lastname')}
                  />
                  {errors.lastname && (
                    <span
                      id="lastname-error"
                      className="text-red-600 block mt-2 text-right"
                    >
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
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email && 'email-error'}
                    {...register('email')}
                  />
                  {errors.email && (
                    <span
                      id="email-error"
                      className="text-red-600 block mt-2 text-right"
                    >
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
                  <Controller
                    name="birthdate"
                    control={control}
                    render={({field}) => (
                      <DatePicker
                        onChange={date =>
                          field.onChange(convertLocalToUTCDate(date))
                        }
                        selected={field.value}
                        // showIcon
                        todayButton="Today"
                        isClearable
                        maxDate={new Date()}
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={15}
                        scrollableYearDropdown
                        shouldCloseOnSelect={false}
                        className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                          errors.birthdate
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        aria-invalid={errors.birthdate ? 'true' : 'false'}
                        aria-describedby={errors.birthdate && 'birthdate-error'}
                      />
                    )}
                  />
                  {errors.birthdate && (
                    <span
                      id="birthdate-error"
                      className="text-red-600 block mt-2 text-right"
                    >
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
                  <Controller
                    name="startdate"
                    control={control}
                    render={({field}) => (
                      <DatePicker
                        onChange={date =>
                          field.onChange(convertLocalToUTCDate(date))
                        }
                        selected={field.value}
                        todayButton="Today"
                        // showIcon
                        isClearable
                        maxDate={new Date()}
                        filterDate={date =>
                          date.getDay() !== 6 && date.getDay() !== 0
                        }
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={15}
                        scrollableYearDropdown
                        shouldCloseOnSelect={false}
                        className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                          errors.startdate
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } `}
                        aria-invalid={errors.startdate ? 'true' : 'false'}
                        aria-describedby={errors.startdate && 'startdate-error'}
                      />
                    )}
                  />
                  {/* <input
                  type="date"
                  id="email"
                  className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                    errors.startdate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('startdate')}
                /> */}
                  {errors.startdate && (
                    <span
                      id="startdate-error"
                      className="text-red-600 block mt-2 text-right"
                    >
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
                        aria-invalid={errors.street ? 'true' : 'false'}
                        aria-describedby={errors.street && 'street-error'}
                        {...register('street', {shouldUnregister: true})}
                      />
                      {errors.street && (
                        <span
                          id="street-error"
                          className="text-red-600 block mt-2 text-right"
                        >
                          {errors.street?.message}
                        </span>
                      )}
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
                        aria-invalid={errors.city ? 'true' : 'false'}
                        aria-describedby={errors.city && 'city-error'}
                        {...register('city', {shouldUnregister: true})}
                      />
                      {errors.city && (
                        <span
                          id="city-error"
                          className="text-red-600 block mt-2 text-right"
                        >
                          {errors.city?.message}
                        </span>
                      )}
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
                        aria-invalid={errors.zipcode ? 'true' : 'false'}
                        aria-describedby={errors.zipcode && 'zipcode-error'}
                        {...register('zipcode', {shouldUnregister: true})}
                      />
                      {errors.zipcode && (
                        <span
                          id="zipcode-error"
                          className="text-red-600 block mt-2 text-right"
                        >
                          {errors.zipcode?.message}
                        </span>
                      )}
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
                  className={`w-full text-white bg-[#b7ce48] hover:bg-[#abc042] focus:ring-4 focus:outline-none focus:ring-[#aabe44] font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
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
    </>
  )
}

export default Form

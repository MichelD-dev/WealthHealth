import {SubmitHandler, useForm, Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {
  EmployeeSchema,
  EmployeeSchemaType,
  EmployeeWithAddressSchemaType,
} from '@/types/employee.model'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  lazy,
  Suspense,
  useState,
} from 'react'
import supabase from '@/config/supabaseClient'
import {ModalRef} from '@/components/Modal/Modal'
import Dropdown from '@/components/Dropdown/Dropdown'

import {Modal} from '@/components/Modal'
// import {Modal} from '../../../lib/dist'
import DateInput from '@/components/formInputs/DateInput'
import TextInput from '@/components/formInputs/InputField'

// import {Modal} from 'md-modal'
// const Modal = lazy(() => import('@/components/Modal/Modal'))

const Form = () => {
  const [fetchError, setFetchError] = useState<string | null>(null)

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

  const modalRef = useRef<ModalRef>(null)

  const onSubmit = useCallback<SubmitHandler<EmployeeSchemaType>>(
    async employee => {
      console.log(employee)
      // try {
      const {status} = await supabase
        .from('employees')
        .insert(employee)
        .select('birthdate')

      if (status === 201) {
        setFetchError(null)
        modalRef.current?.open()
      } else {
        setFetchError('An error occurred. Please try again later.')
        modalRef.current?.open()
      }
      // } catch (error) {
      //   setFetchError('An error occurred. Please try again later.')
      //   modalRef.current?.open()
      // }
    },
    [],
  )

  const address = watch('address')

  return (
    <>
      <Modal ref={modalRef}>{fetchError ?? 'Employee Created!'}</Modal>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 absolute top-20">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold text-[#aabe44] leading-tight tracking-tight md:text-2xl">
                Create Employee
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <TextInput<EmployeeWithAddressSchemaType>
                  label="First Name"
                  id="firstname"
                  register={register}
                  error={errors.firstname?.message}
                />
                <TextInput<EmployeeWithAddressSchemaType>
                  label="Last Name"
                  id="lastname"
                  register={register}
                  error={errors.lastname?.message}
                />
                <TextInput<EmployeeWithAddressSchemaType>
                  label="Your email"
                  id="email"
                  register={register}
                  error={errors.email?.message}
                />
                <DateInput
                  label="Date of birth"
                  fieldName="birthdate"
                  control={control}
                  errors={errors}
                />
                <DateInput
                  label="Start Date"
                  fieldName="startdate"
                  control={control}
                  errors={errors}
                />

                <div className="flex align-bottom">
                  <label className="block my-1">
                    <input
                      className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                      type="checkbox"
                      role="switch"
                      {...register('address')}
                    />
                    <span>Address</span>
                  </label>
                </div>

                {address && (
                  <fieldset className="border border-solid border-gray-300 p-3">
                    <TextInput<EmployeeWithAddressSchemaType>
                      label="Street"
                      id="street"
                      register={register}
                      error={errors.street?.message}
                    />
                    <TextInput<EmployeeWithAddressSchemaType>
                      label="City"
                      id="city"
                      register={register}
                      error={errors.city?.message}
                    />
                    <Controller
                      name="state"
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <Dropdown
                          label="State"
                          labelclassname="block my-1"
                          options={['Alabama', 'Ohio', 'Montana']}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          className="form-select bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        />
                      )}
                    />
                    <TextInput<EmployeeWithAddressSchemaType>
                      label="Zip Code"
                      id="zipcode"
                      register={register}
                      error={errors.firstname?.message}
                    />
                  </fieldset>
                )}
                <Controller
                  name="department"
                  control={control}
                  render={({field: {onChange, onBlur}}) => (
                    <Dropdown
                      label="Department"
                      labelclassname="block my-1"
                      options={[
                        'Sales',
                        'Marketing',
                        'Engineering',
                        'Human Ressources',
                        'Legal',
                      ]}
                      onChange={onChange}
                      onBlur={onBlur}
                      defaultValue="Marketing"
                      className="form-select bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    />
                  )}
                />
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

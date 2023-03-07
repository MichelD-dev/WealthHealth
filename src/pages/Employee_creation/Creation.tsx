import {SubmitHandler, useForm, Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {
  EmployeeSchema,
  EmployeeSchemaType,
  EmployeeWithAddressSchemaType,
} from '@/types/employee.model'
import {useEffect, useMemo, useRef, useState} from 'react'
import DateInput from '@/components/formInputs/DateInput'
import TextInput from '@/components/formInputs/InputField'
import AddressToggle from '@/components/formInputs/AddressToggle'
import {useSupabase} from '@/api/useSupabase'
import Dropdown from '@midly/react-dropdown/dist/esm/Dropdown'
import {Modal} from '@midly/react-modal'
import {ModalRef} from '@midly/react-modal/dist/esm/Modal'
import {twMerge} from 'tailwind-merge'

/**
Formulaire de création d'un employé
@returns JSX.Element
*/
const Form = () => {
  const [newEmployee, setNewEmployee] = useState<{
    firstname: string
    lastname: string
  } | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  /**
Hook useForm pour gérer le formulaire
*/
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState,
    formState: {errors, isSubmitting, isSubmitSuccessful},
  } = useForm<EmployeeWithAddressSchemaType>({
    resolver: useMemo(() => zodResolver(EmployeeSchema), [EmployeeSchema]),
  })

  /**
Reset le formulaire si la soumission est réussie
*/
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [formState, reset])

  const modalRef = useRef<ModalRef>(null)

  /**
Hook useSupabase pour appeler l'API Supabase
*/
  const {createEmployee} = useSupabase()

  /**
Fonction onSubmit pour soumettre le formulaire
@param employee Les informations de l'employé à créer
*/
  const onSubmit: SubmitHandler<EmployeeWithAddressSchemaType> = async (
    employee: EmployeeSchemaType,
  ) => {
    const {status, data} = await createEmployee(employee)

    if (status === 201) {
      setFetchError(null)
      setNewEmployee(data?.[0] ?? null)
      modalRef.current?.open()
    } else {
      setFetchError('An error occurred. Please try again later.')
      modalRef.current?.open()
    }
  }

  /**
Valeur booléenne du champ 'address' pour savoir si la section adresse du formulaire est ouverte.
*/
  const address = watch('address')

  return (
    <>
      <Modal ref={modalRef}>
        {fetchError ??
          `${newEmployee?.firstname} ${newEmployee?.lastname} file created!`}
      </Modal>
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
                  autoFocus
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
                  label="Your Email"
                  id="email"
                  register={register}
                  error={errors.email?.message}
                />
                <DateInput
                  label="Date of Birth"
                  fieldName="birthdate"
                  control={control}
                  errors={errors}
                />
                <DateInput
                  label="Start Date"
                  fieldName="startdate"
                  filterDate={date =>
                    date.getDay() !== 6 && date.getDay() !== 0
                  }
                  control={control}
                  errors={errors}
                />
                <AddressToggle register={register} />
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
                      className="form-select bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    />
                  )}
                />
                <button
                  type="submit"
                  className={twMerge(
                    `w-full text-white bg-[#b7ce48] hover:bg-[#abc042] focus:ring-4 focus:outline-none focus:ring-[#aabe44] font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                      isSubmitting && 'disabled'
                    }`,
                  )}
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

import {Employee} from '@/types/types'
import {zodResolver} from '@hookform/resolvers/zod'
import {DispatchWithoutAction, useCallback, useState} from 'react'
import {useForm, Controller} from 'react-hook-form'
import TextInput from '../formInputs/InputField'
import {useSupabase} from '@/api/useSupabase'
import {
  employeeEditSchema,
  employeeEditSchemaType,
} from '@/types/employee.model'
import {Dropdown} from '@midly/react-dropdown'

const ModalForm = ({
  addressToEdit,
  closeModal,
  setEdited,
}: {
  addressToEdit: Partial<Employee> | null
  closeModal: () => void
  setEdited: DispatchWithoutAction
}) => {
  const [fetchError, setFetchError] = useState<string | null>(null)

  const {updateEmployee} = useSupabase()

  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<Partial<employeeEditSchemaType>>({
    resolver: zodResolver(employeeEditSchema),
  })

  const onSubmit = useCallback(
    async (newData: Partial<employeeEditSchemaType>) => {
      const {status} = await updateEmployee(
        newData,
        addressToEdit?.id as number,
      )

      if (status === 204) {
        closeModal()
        setEdited()
      } else {
        setFetchError('An error occurred. Please try again later.')
      }
    },
    [],
  )
  return (
    <>
      <h2 className="text-left mb-5 text-lg underline">
        Please provide your updated data:
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset className="border border-solid border-gray-300 p-3 text-left w-96 m-auto">
          <TextInput<Partial<employeeEditSchemaType>>
            label="Last Name"
            id="lastname"
            register={register}
            defaultValue={addressToEdit?.lastname ?? ''}
            error={errors.lastname?.message}
          />
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
          <TextInput<Partial<employeeEditSchemaType>>
            label="Street"
            id="street"
            register={register}
            defaultValue={addressToEdit?.street ?? ''}
          />
          <TextInput<Partial<employeeEditSchemaType>>
            label="City"
            id="city"
            register={register}
            defaultValue={addressToEdit?.city ?? ''}
          />
          <Controller
            name="state"
            control={control}
            render={({field: {onChange, onBlur}}) => (
              <Dropdown
                label="State"
                labelclassname="block my-1"
                options={['Alabama', 'Ohio', 'Montana']}
                onChange={onChange}
                onBlur={onBlur}
                className="form-select bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              />
            )}
          />
          <TextInput<Partial<employeeEditSchemaType>>
            label="Zip Code"
            id="zipcode"
            register={register}
            defaultValue={addressToEdit?.zipcode ?? ''}
          />
        </fieldset>
        <div className="flex gap-10 w-96">
          <button
            type="submit"
            className={
              'text-white bg-[#b7ce48] hover:bg-[#abc042] focus:ring-4 focus:outline-none focus:ring-[#aabe44] mt-8 mb-4 w-96 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            }
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              closeModal()
            }}
            className={
              'text-white bg-[#b7ce48] hover:bg-[#abc042] focus:ring-4 focus:outline-none focus:ring-[#aabe44] mt-8 mb-4 w-96 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            }
          >
            Cancel
          </button>
        </div>
      </form>
      {fetchError && <p className="mt-2 text-red-600">{fetchError}</p>}
    </>
  )
}

export default ModalForm

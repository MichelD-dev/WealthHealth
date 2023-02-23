import {z} from 'zod'

const EmployeeWithoutAddressSchema = z.object({
  firstname: z.string().trim().min(1, {message: 'First name is required'}),
  lastname: z.string().trim().min(1, {message: 'Last name is required'}),
  email: z.string().trim().min(1, {message: 'Email is required'}).email(),
  birthdate: z.date(),
  startdate: z.date(),
  address: z.literal(false),
  department: z.enum([
    'Sales',
    'Marketing',
    'Engineering',
    'Human Ressources',
    'Legal',
  ]),
})

const AddressSchema = z.object({
  address: z.literal(true),
  street: z
    .string({
      required_error: 'Street is required',
    })
    .trim()
    .min(1, {message: 'Street is required'})
    .nullable(),
  city: z
    .string({
      required_error: 'City is required',
    })
    .trim()
    .min(1, {message: 'City is required'})
    .nullable(),
  state: z.enum(['Alabama', 'Ohio', 'Montana']),
  zipcode: z
    .string({
      required_error: 'Zipcode is required',
    })
    .trim()
    .min(1, {message: 'Zipcode is required'})
    .nullable(),
})

const EmployeeWithAddressSchema =
  EmployeeWithoutAddressSchema.merge(AddressSchema)

export const EmployeeSchema = z.discriminatedUnion('address', [
  EmployeeWithoutAddressSchema,
  EmployeeWithAddressSchema,
])

export const employeeEditSchema = AddressSchema.omit({address: true})
  .extend({
    lastname: z.string().trim().min(1, {message: 'Last name is required'}),
    department: z.enum([
      'Sales',
      'Marketing',
      'Engineering',
      'Human Ressources',
      'Legal',
    ]),
  })
  .partial()

export type EmployeeSchemaType = z.infer<typeof EmployeeSchema>
export type EmployeeWithAddressSchemaType = z.infer<
  typeof EmployeeWithAddressSchema
>
export type employeeEditSchemaType = z.infer<typeof employeeEditSchema>

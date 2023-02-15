import {z} from 'zod'
import isEmail from 'validator/lib/isEmail'

const EmployeeWithoutAddressSchema = z.object({
  firstname: z.string().trim().min(1, {message: 'First name is required'}),
  lastname: z.string().trim().min(1, {message: 'Last name is required'}),
  email: z.string().trim().min(1, {message: 'Email is required'}).email(),
  birthdate: z.preprocess(arg => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
  }, z.date()),
  startdate: z.preprocess(arg => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
  }, z.date()),
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
    .min(1, {message: 'Street is required'}),
  city: z
    .string({
      required_error: 'City is required',
    })
    .trim()
    .min(1, {message: 'City is required'}),
  state: z.enum(['Alabama', 'Ohio', 'Montana']),
  zipcode: z
    .string({
      required_error: 'Zipcode is required',
    })
    .trim()
    .min(1, {message: 'Zipcode is required'}),
})

const EmployeeWithAddressSchema =
  EmployeeWithoutAddressSchema.merge(AddressSchema)

export const EmployeeSchema = z.discriminatedUnion('address', [
  EmployeeWithoutAddressSchema,
  EmployeeWithAddressSchema,
])

export type EmployeeSchemaType = z.infer<typeof EmployeeSchema>
export type EmployeeWithAddressSchemaType = z.infer<
  typeof EmployeeWithAddressSchema
>

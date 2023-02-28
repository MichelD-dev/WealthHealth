import supabase from '@/config/supabaseClient'
import {EmployeeSchemaType} from '@/types/employee.model'
import {Employee} from '@/types/types'

export const useSupabase = () => {
  const getEmployees = async () => {
    const {status, data} = await supabase
      .from('employees')
      .select(
        'id, firstname, lastname, startdate, department, birthdate, street, city, state, zipcode',
      )

    return {status, data}
  }

  const createEmployee = async (employeeData: EmployeeSchemaType) => {
    const {status, data} = await supabase
      .from('employees')
      .insert(employeeData)
      .select('firstname, lastname')

    return {status, data}
  }

  const updateEmployee = async (
    employeeData: Partial<Employee>,
    id: number,
  ) => {
    const {status} = await supabase
      .from('employees')
      .update(employeeData)
      .match({id})

    return {status}
  }

  const deleteEmployee = async (id: number) => {
    const {status} = await supabase.from('employees').delete().match({id})

    return {status}
  }

  return {getEmployees, createEmployee, updateEmployee, deleteEmployee}
}

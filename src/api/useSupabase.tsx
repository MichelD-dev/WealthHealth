import supabase from '@/config/supabaseClient'
import {EmployeeSchemaType} from '@/types/employee.model'
import {Employee} from '@/types/types'

/**
 * Ce hook personnalisé fournit des méthodes pour accéder aux données d'employés à l'aide de l'API Supabase.
 * Il utilise le client Supabase configuré dans le fichier `supabaseClient.ts` pour accéder aux données.
 * Les méthodes fournies incluent la récupération, la création, la mise à jour et la suppression d'employés.
 *
 * @returns un objet contenant les méthodes suivantes :
 *    - `getEmployees`: récupère tous les employés de la table `employees`.
 *    - `createEmployee`: crée un nouvel employé en utilisant les données fournies.
 *    - `updateEmployee`: met à jour un employé existant avec les données fournies.
 *    - `deleteEmployee`: supprime un employé existant en utilisant son identifiant.
 */

export const useSupabase = () => {
  /**
   * Cette méthode récupère tous les employés de la table `employees`.
   *
   * @returns un objet contenant deux propriétés :
   *    - `status`: le code de statut HTTP de la réponse.
   *    - `data`: les données renvoyées par la requête.
   */
  const getEmployees = async () => {
    const {status, data} = await supabase
      .from('employees')
      .select(
        'id, firstname, lastname, startdate, department, birthdate, street, city, state, zipcode',
      )

    return {status, data}
  }

  /**
   * Cette méthode crée un nouvel employé en utilisant les données fournies.
   *
   * @param employeeData Les données de l'employé à créer. Doit suivre le schéma de `EmployeeSchemaType`.
   * @returns un objet contenant deux propriétés :
   *    - `status`: le code de statut HTTP de la réponse.
   *    - `data`: les données renvoyées par la requête.
   */
  const createEmployee = async (employeeData: EmployeeSchemaType) => {
    const {status, data} = await supabase
      .from('employees')
      .insert(employeeData)
      .select('firstname, lastname')

    return {status, data}
  }

  /**
   * Cette méthode met à jour un employé existant avec les données fournies.
   *
   * @param employeeData Les données de l'employé à mettre à jour. Doit suivre le schéma de `Employee`.
   * @param id L'identifiant de l'employé à mettre à jour.
   * @returns un objet contenant une propriété `status` indiquant le code de statut HTTP de la réponse.
   */
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

  /**
   * Cette méthode supprime un employé existant en utilisant son identifiant.
   *
   * @param id L'identifiant de l'employé à supprimer.
   * @returns un objet contenant deux propriétés :
   *    - `status`: le code de statut HTTP de la réponse.
   * data: les données renvoyées par la requête.
   */
  const deleteEmployee = async (id: number) => {
    const {status, data} = await supabase.from('employees').delete().match({id})

    return {status, data}
  }

  return {getEmployees, createEmployee, updateEmployee, deleteEmployee}
}

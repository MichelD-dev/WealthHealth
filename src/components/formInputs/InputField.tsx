import {InputHTMLAttributes} from 'react'
import {FieldValues, Path, UseFormRegister} from 'react-hook-form'

type TextInputProps<TFieldValues extends FieldValues> = {
  label: string
  id: Path<TFieldValues>
  register: UseFormRegister<TFieldValues>
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

/**

Composant TextInput qui génère un input HTML de type texte avec un label.
Ce composant est utilisé dans des formulaires avec la librairie react-hook-form.
@template TFieldValues - Type générique pour les valeurs des champs du formulaire
@typedef {Object} TextInputProps - Propriétés du composant TextInput
@property {string} label - Label à afficher pour le champ de saisie
@property {string} id - Id du champ de saisie
@property {UseFormRegister<TFieldValues>} register - Fonction register de react-hook-form pour enregistrer le champ de saisie dans le formulaire
@property {string} [error] - Message d'erreur à afficher pour le champ de saisie
@property {InputHTMLAttributes<HTMLInputElement>} inputProps - Autres propriétés HTML à passer à l'input
@property {TFieldValues} defaultValue - Valeur par défaut du champ de saisie
@param {TextInputProps} props - Propriétés du composant TextInput
@returns {JSX.Element} - Composant TextInput
*/
const TextInput = <TFieldValues extends FieldValues>({
  label,
  id,
  register,
  error,
  defaultValue = '',
  ...inputProps
}: TextInputProps<TFieldValues>): JSX.Element => {
  return (
    <div>
      <label htmlFor={id} className="block my-1">
        {label}
      </label>
      <input
        id={id}
        className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        defaultValue={defaultValue}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error && 'firstname-error'}
        {...register(id)}
        {...inputProps}
      />
      {error && (
        <span className="text-red-600 block mt-2 text-right">{error}</span>
      )}
    </div>
  )
}

export default TextInput

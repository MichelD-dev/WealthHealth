import {FieldValues, Path, UseFormRegister} from 'react-hook-form'

type TextInputProps<TFieldValues extends FieldValues> = {
  label: string
  id: Path<TFieldValues>
  register: UseFormRegister<TFieldValues>
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const TextInput = <TFieldValues extends FieldValues>({
  label,
  id,
  register,
  error,
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

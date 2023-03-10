import convertLocalToUTCDate from '@/utils/timeconverter'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  Control,
} from 'react-hook-form'

interface IProps<TFieldValues extends FieldValues> {
  label: string
  fieldName: Path<TFieldValues>
  control: Control<TFieldValues>
  errors: FieldErrors<TFieldValues>
  filterDate?: (date: Date) => boolean
}

/**
Composant DateInput
Un composant pour la saisie des dates, qui utilise le composant DatePicker de react-datepicker.
@module DateInput
@param {Object} props - Les propriétés du composant.
@param {string} props.label - Le label pour le champ de saisie.
@param {string} props.fieldName - Le nom du champ de saisie.
@param {Object} props.control - L'objet control fourni par react-hook-form.
@param {Object} props.errors - Les erreurs de validation fournies par react-hook-form.
@param {Function} [props.filterDate] - La fonction pour filtrer les dates.
@returns {JSX.Element} Le composant DateInput.
*/
function DateInput<TFieldValues extends FieldValues>({
  label,
  fieldName,
  control,
  errors,
  filterDate,
}: IProps<TFieldValues>): JSX.Element {
  return (
    <div>
      <label htmlFor={fieldName} className="block my-1">
        {label}
      </label>
      <Controller
        name={fieldName}
        control={control}
        render={({field}) => (
          <DatePicker
            id={fieldName}
            onChange={date => field.onChange(convertLocalToUTCDate(date))}
            selected={field.value}
            todayButton="Today"
            isClearable
            maxDate={new Date()}
            filterDate={filterDate}
            showYearDropdown
            dateFormatCalendar="MMMM"
            yearDropdownItemNumber={15}
            scrollableYearDropdown
            shouldCloseOnSelect={false}
            className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
              errors[fieldName] ? 'border-red-500' : 'border-gray-300'
            } `}
            aria-invalid={errors[fieldName] ? 'true' : 'false'}
            aria-describedby={errors[fieldName] && `${fieldName}-error`}
          />
        )}
      />
      {errors[fieldName] && (
        <span
          id={`${fieldName}-error`}
          className="text-red-600 block mt-2 text-right"
        >
          {errors[fieldName]?.message as string}
        </span>
      )}
    </div>
  )
}

export default DateInput

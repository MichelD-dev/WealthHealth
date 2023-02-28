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

function DateInput<TFieldValues extends FieldValues>({
  label,
  fieldName,
  control,
  errors,
  filterDate,
}: IProps<TFieldValues>) {
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

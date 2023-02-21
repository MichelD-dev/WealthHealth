import convertLocalToUTCDate from '@/utils/timeconverter'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {Controller, FieldValues, Path} from 'react-hook-form'

interface IProps<TFieldValues> {
  label: string
  fieldName: Path<TFieldValues>
  control: any
  errors: any
}

function DateInput<TFieldValues>({
  label,
  fieldName,
  control,
  errors,
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
            onChange={date => field.onChange(convertLocalToUTCDate(date))}
            selected={field.value}
            todayButton="Today"
            isClearable
            maxDate={new Date()}
            filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
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
          {errors[fieldName]?.message}
        </span>
      )}
    </div>
  )
}

export default DateInput

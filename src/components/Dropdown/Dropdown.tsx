import {HTMLProps, useState} from 'react'

type DropdownProps<T extends string | number | string[]> = {
  options: T[]
  label?: string
  onChange?: (value: T) => void
  labelclassname?: string
  value?: T
} & HTMLProps<HTMLSelectElement>

const Dropdown = <T extends string | number | string[]>({
  options,
  label,
  onChange,
  ...props
}: DropdownProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<T>(options[0])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex
    setSelectedValue(options[selectedIndex])
    if (onChange) {
      onChange(options[selectedIndex])
    }
  }

  return (
    <div>
      {label && (
        <label htmlFor={label} className={props.labelclassname}>
          {label}
        </label>
      )}
      <select
        name={label}
        value={selectedValue}
        onChange={handleSelectChange}
        {...props}
      >
        {options.map(option => (
          <option key={JSON.stringify(option)} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown

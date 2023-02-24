import {ChangeEvent, HTMLProps, useEffect, useState} from 'react'

type DropdownProps<T extends string | number | string[]> = {
  options: T[]
  label?: string
  onChange?: (value: T) => void
  labelclassname?: string
  defaultValue?: T
} & HTMLProps<HTMLSelectElement>

const Dropdown = <T extends string | number | string[]>({
  options,
  label,
  defaultValue,
  onChange,
  ...props
}: DropdownProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<T>(
    defaultValue ?? options[0],
  )

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex
    setSelectedValue(options[selectedIndex])
  }

  useEffect(() => {
    if (onChange) {
      onChange(selectedValue)
    }
  }, [selectedValue])

  return (
    <div>
      {label && (
        <label htmlFor={label} className={props?.labelclassname}>
          {label}
        </label>
      )}
      <select
        name={label}
        onChange={handleSelectChange}
        value={defaultValue ?? selectedValue}
        role="listbox"
        aria-labelledby={label}
        {...props}
      >
        {options.map(option => (
          <option key={option.toString()} value={option} role="option">
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown

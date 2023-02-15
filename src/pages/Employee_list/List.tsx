import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  FilterFn,
} from '@tanstack/react-table'
import {RankingInfo, rankItem} from '@tanstack/match-sorter-utils'
import {useEffect, useMemo, useState} from 'react'
import {EmployeeWithAddressSchemaType} from '@/types/employee.model'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const columnHelper = createColumnHelper<EmployeeWithAddressSchemaType>()

const columns = [
  columnHelper.accessor('firstname', {
    cell: info => info.getValue(),
    header: () => <span>First Name</span>,
  }),
  columnHelper.accessor(row => row.lastname, {
    id: 'lastName',
    cell: info => <strong>{info.getValue()}</strong>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor('startdate', {
    header: () => 'Start Date',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('department', {
    header: () => <span>Department</span>,
  }),
  columnHelper.accessor('birthdate', {
    header: 'Birth Date',
  }),
  columnHelper.accessor('street', {
    header: 'Street',
  }),
  columnHelper.accessor('city', {
    header: 'City',
  }),
  columnHelper.accessor('state', {
    header: 'State',
  }),
  columnHelper.accessor('zipcode', {
    header: 'Zip Code',
  }),
]

const List = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const data: EmployeeWithAddressSchemaType[] = useMemo(
    () => JSON.parse(localStorage.getItem('employees') || ''),
    [],
  )
  const tableData = useMemo(() => data, [data])
  const tableColumns = useMemo(() => columns, [columns])

  const {getHeaderGroups, getRowModel, getFooterGroups, getState} =
    useReactTable({
      columns: tableColumns,
      data: tableData,
      state: {
        sorting,
        columnFilters,
        globalFilter,
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      debugTable: true,
      filterFns: {
        fuzzy: fuzzyFilter,
      },
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      globalFilterFn: fuzzyFilter,
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getFacetedMinMaxValues: getFacetedMinMaxValues(),
      debugHeaders: true,
      debugColumns: false,
    })

  useEffect(() => {
    if (getState().columnFilters[0]?.id === 'fullName') {
      if (getState().sorting[0]?.id !== 'fullName') {
        setSorting([{id: 'fullName', desc: false}])
      }
    }
  }, [getState().columnFilters[0]?.id])

  return (
    <>
      <div className="container mx-auto">
        <div>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            className="p-2 font-lg shadow border border-block relative my-6"
            placeholder="Search..."
          />
        </div>
        <table className="table-auto w-full">
          <thead className="text-[#96b400] bg-gray-100">
            {getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left font-bold border-r border-gray-300"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border-b border-x border-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}

export default List

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
import supabase from '@/config/supabaseClient'
import {Employee} from '@/types/types'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const deleteEmployee = async (employeeId: number) => {
  try {
    await supabase.from('employees').delete().match({id: employeeId})
  } catch (error) {
    console.log('error', error)
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

const List = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [fetchError, setFetchError] = useState<string | null>(null) //TODO affichage avec modale
  const [employees, setEmployees] = useState<Partial<Employee>[]>([])

  const fetchEmployees = async () => {
    const {data, error} = await supabase
      .from('employees')
      .select(
        'id, firstname, lastname, startdate, department, birthdate, street, city, state, zipcode',
      )

    if (error) {
      setFetchError('Could not fetch the employees')
      setEmployees([])
      console.log(error)
    }
    if (data) {
      setEmployees(data)
      setFetchError(null)
      // console.log(data)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  // const tableData = useMemo(
  //   () => (!employees ? Array(30).fill({}) : employees),
  //   [employees],
  // )
  // const tableColumns = useMemo(
  //   () =>
  //     !employees
  //       ? columns.map(column => ({
  //           ...column,
  //           Cell: <p>loading</p>,
  //         }))
  //       : columns,
  //   [columns],
  // )

  const columns = useMemo(
    () => [
      columnHelper.accessor('firstname', {
        header: 'First Name',
      }),
      columnHelper.accessor(row => row.lastname, {
        id: 'lastName',
        header: 'Last Name',
        cell: info => <strong>{info.getValue()}</strong>,
      }),
      columnHelper.accessor('startdate', {
        header: 'Start Date',
      }),
      columnHelper.accessor('department', {
        header: 'Department',
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
      columnHelper.accessor(() => 'delete', {
        header: '',
        id: 'delete',
        cell: tableProps => (
          <button
            onClick={() => {
              deleteEmployee(employees[tableProps.row.index].id as number)
              setEmployees(
                employees.filter(
                  employee =>
                    employee.id !== employees[tableProps.row.index].id,
                ),
              )
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 448 512"
              width="0.75rem"
            >
              <path
                fill="currentColor"
                d="M32 464C32 490.5 53.5 512 80 512h288c26.5 0 48-21.5 48-48V128H32V464zM304 208C304 199.1 311.1 192 320 192s16 7.125 16 16v224c0 8.875-7.125 16-16 16s-16-7.125-16-16V208zM208 208C208 199.1 215.1 192 224 192s16 7.125 16 16v224c0 8.875-7.125 16-16 16s-16-7.125-16-16V208zM112 208C112 199.1 119.1 192 128 192s16 7.125 16 16v224C144 440.9 136.9 448 128 448s-16-7.125-16-16V208zM432 32H320l-11.58-23.16c-2.709-5.42-8.25-8.844-14.31-8.844H153.9c-6.061 0-11.6 3.424-14.31 8.844L128 32H16c-8.836 0-16 7.162-16 16V80c0 8.836 7.164 16 16 16h416c8.838 0 16-7.164 16-16V48C448 39.16 440.8 32 432 32z"
              />
            </svg>
          </button>
        ),
      }),
    ],
    [employees],
  )

  const tableData = useMemo(() => employees, [employees])
  const tableColumns = useMemo(() => columns, [columns])

  const {
    getHeaderGroups,
    getRowModel,
    getState,
    setPageIndex,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    getPageCount,
    setPageSize,
  } = useReactTable({
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
          {fetchError && <p>{fetchError}</p> /*TODO à supprimer*/}
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
        <div className="h-8" />
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => setPageIndex(0)}
            disabled={!getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => setPageIndex(getPageCount() - 1)}
            disabled={!getCanNextPage()}
          >
            {'>>'}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {getState().pagination.pageIndex + 1} of {getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                setPageIndex(page)
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={getState().pagination.pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 25, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
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

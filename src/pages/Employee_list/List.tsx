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
import {useEffect, useMemo, useReducer, useRef, useState} from 'react'
import {EmployeeWithAddressSchemaType} from '@/types/employee.model'
import type {Employee} from '@/types/types'
import {ModalRef} from '@/components/Modal/Modal'
import ModalForm from '@/components/ModalForm/ModalForm'
import {useSupabase} from '@/api/useSupabase'
// import { Modal } from 'lib/dist'
// import {Modal} from '@/components/Modal'
import {Modal} from '../../../lib/dist'
// import {Modal} from 'mdtemp-modal'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [employees, setEmployees] = useState<Partial<Employee>[]>([])
  const [addressToEdit, setAddressToEdit] = useState<Partial<Employee> | null>(
    null,
  )
  const [edited, setEdited] = useReducer(state => !state, false)

  const modalRef = useRef<ModalRef>(null)
  const errorModalRef = useRef<ModalRef>(null)

  const {getEmployees, deleteEmployee} = useSupabase()

  const closeModal = () => {
    setAddressToEdit(null)
    modalRef.current?.close()
  }

  useEffect(() => {
    if (!modalRef.current) {
      setAddressToEdit(null)
    }
  }, [modalRef.current])

  useEffect(() => {
    const fetchEmployees = async () => {
      const {status, data: employeeData} = await getEmployees()

      if (status === 200 && employeeData) {
        closeModal()
        setEmployees(employeeData)
        setFetchError(!employeeData.length ? 'No employees listed.' : null)
      } else {
        setFetchError('An error occurred. Please try again later.')
      }
    }
    setAddressToEdit(null)

    fetchEmployees()
  }, [edited])

  const columns = useMemo(
    () => [
      columnHelper.accessor(row => row.firstname, {
        id: 'firstName',
        header: 'First Name',
        cell: info => (
          <p>
            {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
          </p>
        ),
      }),
      columnHelper.accessor(row => row.lastname, {
        id: 'lastName',
        header: 'Last Name',
        cell: info => (
          <strong>
            {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
          </strong>
        ),
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
          <div className="flex gap-5 justify-evenly">
            <button
              aria-label="Edit employee"
              onClick={() => {
                modalRef.current?.open()
                setAddressToEdit(employees[tableProps.row.index])
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
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
              </svg>
            </button>
            <button
              aria-label="Delete employee"
              onClick={async () => {
                const {status} = await deleteEmployee(
                  employees[tableProps.row.index].id as number,
                )
                if (status === 204) {
                  setDeleteError(null)
                  setEdited()
                } else {
                  setDeleteError('An error occurred. Please try again later.')
                  errorModalRef.current?.open()
                }
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
          </div>
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
    data: tableData as EmployeeWithAddressSchemaType[],
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
    if (employees.length !== 0) {
      if (getState().columnFilters[0]?.id === 'lastName') {
        if (getState().sorting[0]?.id !== 'lastName') {
          setSorting([{id: 'lastName', desc: false}])
        }
      }
    }
  }, [employees])

  return (
    <>
      {fetchError && (
        <p className="flex translate-y-60 justify-center text-red-600 text-xl">
          {fetchError}
        </p>
      )}
      <Modal ref={errorModalRef}>{deleteError}</Modal>
      <Modal ref={modalRef}>
        <ModalForm
          addressToEdit={addressToEdit}
          closeModal={closeModal}
          setEdited={setEdited}
        />
      </Modal>
      <div className="container mx-auto">
        {employees.length !== 0 && (
          <>
            <div className="flex w-full justify-between px-2">
              <div>
                <DebouncedInput
                  value={globalFilter ?? ''}
                  onChange={value => setGlobalFilter(String(value))}
                  className="p-2 font-lg shadow border border-block relative my-6"
                  placeholder="Search..."
                />
              </div>
              <select
                value={getState().pagination.pageSize}
                className="p-2 font-lg shadow border border-block relative my-6 cursor-pointer"
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="h-8" />
            <div className="flex items-center gap-8">
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
              </div>
              <div>
                <span className="flex items-center gap-1">
                  <div>Page</div>
                  <strong>
                    {getState().pagination.pageIndex + 1} of {getPageCount()}
                  </strong>
                </span>
              </div>
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
            </div>
          </>
        )}
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

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import logo from './logo.svg';
import './App.css';

const data = [{ daily: 5 }, { daily: 6 }]

interface ClosureProps {
  days: number,
  daily: number
}
const Closure = ({ days, daily }: ClosureProps) => <>{days * daily}</>

function App () {
  const [days, setDays] = React.useState(2)

  const columns = [
    {
      accessorFn: (row: any) => row.daily,
      header: "Daily",
    },
    {
      accessorFn: (row: any) => row.daily * days,
      header: "Total",
    },
    {
      accessorFn: (row: any) => row.daily * days,
      cell: ({ row }: any) => <Closure days={days} daily={row.original?.daily} />,
      header: "Total (React-closure-in-cell method)",
    },
    {
      accessorFn: (row: any) => row.daily * days,
      cell: ({ row, table }: any) =>
        <>{row.original.daily * table.options.meta.days}</>,
      header: "Total (table-meta-in-cell method)",
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: { days },
  })

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      {`Days: ${days}`}
      <button onClick={() => { setDays(days + 1) }} className="border p-2">
        Increment
      </button>
    </div>
  )
}

export default App;

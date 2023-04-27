import React, {useMemo} from 'react'
import { useTable, useSortBy } from 'react-table'
import '../components/table.css'

export default function SortingTable({ucenici, odeljenjeU}) {

    const ucenikU = []
    let predmetiU = []
    const COLUMNS = [
    {
        Header: 'Ime',
        Footer: 'Ime',
        accessor: 'ime'
    }
]

   {ucenici.map((uc) => {
        if (uc.odeljenje === odeljenjeU)
        {
            ucenikU.splice(0,0,uc)
            //predmetiU = uc.predmet
        }
    })}

    function checkUc(uc, index) {
        if (uc.odeljenje === odeljenjeU) 
        {   let predmet_new = {}
            uc.predmet.map((pr, i) => {
                predmet_new = {
                    Header: `${pr}`,
                    Footer: `${pr}`,
                    accessor: `ocene[${i}]`
                }
                COLUMNS.push(predmet_new)
            })
        }
        return uc.odeljenje === odeljenjeU
    }

    if (ucenici.some((uc, index) => checkUc(uc,index))) {    
    }

    const columns = useMemo(() => COLUMNS, [odeljenjeU])
    const data = useMemo(()=> ucenikU, [odeljenjeU])
    
    const tableInstance = useTable({
        columns,
        data
    }, useSortBy)

    const { getTableProps, getTableBodyProps, headerGroups, /*footerGroups,*/ rows, prepareRow } = tableInstance

  return (
    <table {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                </span>
                            </th>
                        ))
                    }
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            { 
                rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map( cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })
                            }
            </tr>
                    )
                })
            }
            
        </tbody>
        {/* 
        <tfoot>
            {footerGroups.map(footerGroup => (
                <tr {...footerGroup.getFooterGroupProps()}>
                    {footerGroup.headers.map(column => (
                        <td {...column.getFooterProps}>
                            {column.render('Footer')}
                        </td>
                    ))}
                </tr>
            ))}
        </tfoot>
        */}
    </table>
  )
}

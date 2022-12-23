import React, { useContext } from 'react'
import "./utilities.css"

import { importContext } from '../../Context/ContactContext'
export default function Utilities() {
    const { setImportClicked, setDeleteOk } = useContext(importContext)
    return (
        <div id='utility-wrap'>
            <div id='uti-date' className='button-style'> <span>Select Date</span><input type="date" name="select-date" id="select-date" /></div>
            <div className="button-style" id='filter-wrap'><img src="/filter.png" alt="filter" id='filter-img' /><span>Filters</span><select name="" id="filter-select" >
                <option value="filter"></option>
                <option value="filter">Aplhabetically</option>
            </select></div>
            <div className='button-style'>
                <img src="/delete.png" alt="delete" /><button onClick={() => {
                    setImportClicked(false)
                    setDeleteOk(true)
                }
                }>Delete</button>
            </div>
            <div className='button-style'>
                <img id='export-img' src="/import.png" alt="import" /><button onClick={() => {
                    setImportClicked(true)
                    setDeleteOk(false)
                }
                }>Import</button>
            </div>
            <div id='uti-export' className='button-style'>
                <img src="/export.png" alt="export" />  <button>Export</button>
            </div>
        </div>
    )
}

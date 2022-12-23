import React from 'react'
import ContactTable from './ContactTable/ContactTable'
import "./tablearea.css"
import Utilities from './utiities/Utilities'

export default function TableArea() {
    return (
        <div id='tablearea-wrap'>
            <Utilities />
            <div id='table-container'>
                <ContactTable />
            </div>
        </div>
    )
}

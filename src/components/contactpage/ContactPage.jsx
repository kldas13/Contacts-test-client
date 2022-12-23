import React, { useContext } from 'react'
import Header from '../Header/Header'
import Pagination from '../Pagination/Pagination'
import Sidebar from '../sidebar/sidebar'
import TableArea from '../tablearea/TableArea'
import "./contactpage.css"
// import Delete from '../delete/Delete'
// import ImportFile from '../import/ImportFile'
import Delete from '../delete/Delete'
import ImportFile from "../import/importFile"

import { importContext } from '../Context/ContactContext'
export default function ContactPage() {
    const { isDeleted, imported,isImportClicked ,isDeleteOk } = useContext(importContext)
    return (
        <div id='contact-page-wrap'>
            <div className= {isDeleteOk || isDeleted ||imported||isImportClicked ? "delete-import-components " : ""}  >
                <Delete />
                <ImportFile />
            </div>
            <Sidebar />
            <Header />
            <TableArea />
            <Pagination />
        </div>
    )
}

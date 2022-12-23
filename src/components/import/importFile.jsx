
import React, { useContext, useState } from 'react'
import "./importFile.css"
import { parse } from "papaparse"
import axios from "axios"
import { importContext } from '../Context/ContactContext'
export default function ImportFile() {
    const { imported, setImported, isImportClicked, setImportClicked } = useContext(importContext)
    const handleDragOver = (e) => {
        e.preventDefault()
        console.log("dragged");
    }
    const HandleDrop = (e) => {
        e.preventDefault();
        Array.from(e.dataTransfer.files).map(async (file) => {
            let text = await file.text()
            let result = parse(text, { header: true })
            let payload = {
                importedData: result.data
            };
            const token = window.localStorage.getItem("jwt")
            const sendData = () => {
                axios.post("https://contact-srver-test.onrender.com/contacts/import",
                    payload,
                    {
                        headers: { authorization: token },

                    }

                )
                    .then((data) => {
                        setImported(true)
                        setImportClicked(false)
                        setTimeout(async () => {
                            await setImported(false)

                        }, 1500)
                    })
                    .catch((err) => console.log(err))
            }
            sendData()


        })
    }

    return (
        <div className='import-component-container'>
            {isImportClicked &&
                <div className='import-container' onDragOver={(e) => handleDragOver(e)} onDrop={(e) => HandleDrop(e)} >
                    <img src="/fileIcon.png" style={{ width: "30px" }} alt="file-icon" />
                    <div style={{ fontSize: "11px", fontWeight: 600 }} >Import File</div>

                    <div style={{ fontSize: "11px", color: "#2DA5FC", textAlign: "center" }}> Drag & Drop a CSV File to upload </div>
                    <button className='cancel-btn' onClick={() => {
                        setImportClicked(false)
                    }} >Cancel</button>
                </div>
            }
            {imported &&
                <div>
                    <div className='import-container' >
                        <img src="/success.png" style={{ width: "30px" }} alt="success-icon" />
                        <div style={{ fontSize: "11px", fontWeight: 600 }} >Import Complete</div>
                        <div style={{ fontSize: "11px", color: "#2DA5FC", textAlign: "center" }}>  CSV File is uploaded </div>
                    </div>
                </div>
            }


        </div>
    )
}

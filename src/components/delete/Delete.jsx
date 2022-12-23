import React, { useContext, useState } from 'react'
import "./Delete.css"
import { importContext } from '../Context/ContactContext';
import axios from "axios"
export default function Delete(props) {
    const { isDeleted, setDeleted, setDeleteOk, isDeleteOk, selectedId, setSelectedId, isSelectedLen, setSelectedLen } = useContext(importContext)
    console.log(selectedId);

    const token = window.localStorage.getItem("jwt")
    const handleDelete = (e) => {
        console.log("printing1", isSelectedLen);
        console.log(selectedId);

        if (selectedId.length != 0) {
            setSelectedLen(true)
        } else {
            setSelectedLen(false)
        }
        console.log("printing2", isSelectedLen);
        axios.delete("https://contact-srver-test.onrender.com/contacts/delete", {
            headers: {
                authorization: token
            },
            data: {
                source: selectedId
            }
        })
            .then((data) => {
                setDeleted(true)
                setDeleteOk(false)
                console.log(isSelectedLen);
                setSelectedId([])
                setTimeout(async () => {
                    await setDeleted(false)
                }, 1500)
            })
            .catch((err) => console.log(err))


    }
    return (
        <div className="delete-component-container">
            {isDeleteOk &&
                <div className='delete-container'  >
                    <div className='icon-holder' >
                        <img src='/deleteIcon.png' style={{ width: "13px" }} alt="delete-icon" />
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 600 }} >Delete Contacts</div>

                    <div style={{ color: "#2DA5FC", fontSize: "12px", textAlign: "center" }}>Sure you want to delete these contacts ?</div>
                    <div className='btns-holder'>
                        <button className='cancel-btn' onClick={() => {
                            setDeleteOk(false)
                        }} >Cancel</button>

                        <button className='confirm-btn' onClick={(e) => handleDelete(e)} >OK</button>

                    </div>
                </div>
            }
            {isDeleted &&
                <div className='delete-component-container' >
                    <div className='delete-container' >
                        {isSelectedLen ?
                            <img src="/success.png" style={{ width: "30px" }} alt="success-icon" />
                            :
                            <img src="/wrong.png" style={{ width: "30px" }} alt="wrong-icon" />
                        }
                        <div style={{ fontSize: "15px", fontWeight: 600 }} >
                            {isSelectedLen ? "Contacts Deleted" : "Select Contacts To Delete"}
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}


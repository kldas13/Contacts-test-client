import { ContactContext, SearchContext } from "./ContactContext";
import { importContext } from "./ContactContext";
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"

export default function ContactProvider({ children }) {

    const [contactdata, setcontactdata] = useState([])
    const [pagedcontact, setpagedcontact] = useState([])

    const token = window.localStorage.getItem("jwt")

    const { imported, isDeleted } = useContext(importContext)

    useEffect(() => {
        const datafetch = async () => {
            await axios.get("https://contact-srver-test.onrender.com/contacts", { headers: { authorization: token } }).then((response) => { setcontactdata(response.data.contacts) })
            console.log(contactdata)
        }
        datafetch()
        // eslint-disable-next-line 
    }, [imported, isDeleted, token])


    return (
        <ContactContext.Provider value={{ contactdata, setcontactdata, pagedcontact, setpagedcontact }}>
            {children}
        </ContactContext.Provider>
    )
}

import React, { useContext, useState } from 'react'
import "./header.css"


import { ContactContext, SearchContext } from '../Context/ContactContext'
export default function Header() {
    const [searchquery, setsearchquery] = useState([])
    const [searchclick, setsearchclick] = useState(true)
    const token = window.localStorage.getItem('jwt')
    const { contactdata, setcontactdata, pagedcontact, setpagedcontact } = useContext(ContactContext)
    const { searchdata, setsearchdata, setisSearch } = useContext(SearchContext)
    const handledisplay = (item) => {
        if (token) {
            setsearchdata(item)
            setisSearch(true)
            setsearchclick(false)
        }
    }
    let user_display=window.localStorage.getItem('user_name');
    return (
        <div id='header-wrap'>
            <div id='total-contact'>Total Contacts</div>
            <div id='search'>  <img className='search-icon' src="/search.png" alt="" onClick={() => {

            }} /> <input type="search" placeholder='Search contact by Email ID..' name="search" id="search-inp" value={searchdata.Email} onChange={(e) => {

                let query = contactdata.map((item) => {
                    if (item.Email.includes(e.target.value) && e.target.value !== "" && e.target.value.length >= 2) {
                        return (item)
                    } else if (e.target.value === "") {
                        setisSearch(false)
                        setsearchclick(true)
                        setsearchdata('')
                    }
                    return undefined
                })
                let filterquery = query.filter((item) => {
                    return item !== undefined
                })
                // console.log(filterquery)
                setsearchquery(filterquery)

            }} />

                <ul id='querylist'>
                    {
                        searchclick ? searchquery.map((item, i) => {
                            return (
                                <li key={i} onClick={() => { handledisplay(item) }}>
                                    <img className='search-icon' src="/search.png" alt="" /> <span className='searchitem'>{item.Email}</span>
                                </li>
                            )
                        }) : ""
                    }
                </ul>

            </div>
            <div id='admin' ><img src="/user.png" alt="" /><div id='admin-name'><span>{user_display}</span>
                <span>User </span></div></div>

        </div>

    )
}

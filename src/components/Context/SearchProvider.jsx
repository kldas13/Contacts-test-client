import React, { useState } from 'react'
import { SearchContext } from './ContactContext'

export default function SearchProvider({ children }) {
    const [searchdata, setsearchdata] = useState("")
    const [isSearch, setisSearch] = useState(false)
    return (
        <>
            <SearchContext.Provider value={{ searchdata, setsearchdata, isSearch, setisSearch }}>
                {children}
            </SearchContext.Provider>
        </>
    )
}

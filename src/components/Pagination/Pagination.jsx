// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import React, { useContext, useEffect, useState } from 'react'
import { ContactContext } from '../Context/ContactContext'
import "./Pagination.css"
export default function Pagination() {
    const { contactdata, setcontactdata, pagedcontact, setpagedcontact } = useContext(ContactContext)

    const [pageNo, setPageNo] = useState(1);
    let limit = 10;
    let pages = Math.ceil(contactdata.length / limit);
    let pagesArray = new Array(pages).fill(0);
    const start = (pageNo - 1) * limit;
    const end = pageNo * limit;
    useEffect(() => {
        setpagedcontact(contactdata.slice(start, end));
    }, [contactdata])
    useEffect(() => {
        setpagedcontact(contactdata.slice(start, end));
    }, [pageNo])



    return (
        <div id='pagination'>

            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item" onClick={() => {
                        if (pageNo > 1) {
                            console.log(pageNo - 1);
                            setPageNo(pageNo - 1)
                        }
                    }}>
                        <span className="page-link" aria-label="Previous">
                            <span aria-hidden="true" >&laquo;</span>
                        </span>
                    </li>
                    {pagesArray.map((ele, i) => {
                        return (
                            <li className="page-item" key={i + 1} onClick={() => {
                                console.log(i + 1);
                                setPageNo(i + 1)
                            }}><span className="page-link"  >{i + 1}</span></li>
                        )
                    })}


                    <li className="page-item" onClick={() => {
                        if (pageNo < pages) {
                            console.log(pageNo + 1);
                            setPageNo(pageNo + 1)
                        }

                    }} >
                        <span className="page-link" aria-label="Next" >
                            <span aria-hidden="true" >&raquo;</span>
                        </span>
                    </li>
                </ul>
            </nav>
        </div>

    )
}

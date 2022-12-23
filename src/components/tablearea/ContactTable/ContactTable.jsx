import React, { useContext } from 'react'
import "./ContactTable.css"
import { ContactContext, SearchContext, importContext } from '../../Context/ContactContext'
import axios from "axios"
export default function ContactTable() {

    const { pagedcontact } = useContext(ContactContext)
    const { searchdata, isSearch } = useContext(SearchContext)
    const { setDeleted, setDeleteOk, selectedId, setSelectedId } = useContext(importContext)
    // console.log(searchdata)

    const handleCheckBox = (e, id) => {
        if (e.target.checked) {
            setSelectedId([...selectedId, e.target.value])
            console.log(selectedId);
        } else {
            const newFiltered = selectedId.filter((id1) => {
                return id1 !== e.target.value
            })
            setSelectedId(newFiltered)

        }
    }
    const token = window.localStorage.getItem("jwt")
    const handleDelete = (e, id) => {

        axios.delete("https://contact-srver-test.onrender.com/contacts/delete", {
            headers: {
                authorization: token
            },
            data: {
                source: [id]
            }
        })
            .then((data) => {
                setDeleted(true)
                setDeleteOk(false)
                setSelectedId([])
                setTimeout(async () => {
                    await setDeleted(false)
                }, 2000)
            })
            .catch((err) => console.log(err))


    }
    return (
        <div id='contactTable-wrap'>
            <table id='table-wrap' cellSpacing={0}>
                <thead >
                    <tr id='head-wrap'>
                        <th className='border-left-radius' ><div><input type="checkbox" name="" id="" /></div></th>
                        <th >Name</th>
                        <th >| Designation</th>
                        <th >| Industry</th>
                        <th >| Company</th>
                        <th >| Email</th>
                        <th>| Phone Number</th>
                        <th>| Country</th>
                        <th className='border-right-radius'>| Action</th>
                    </tr>
                </thead>

                <tbody id='table-rows'>
                    {isSearch ?

                        <tr className='table-content-wrap' >
                            <td><div><input type="checkbox" name="" id="" /></div></td>
                            <td>{searchdata.Name}</td>
                            <td>{searchdata.Designation}</td>
                            <td>{searchdata.Industry}</td>
                            <td>{searchdata.Company}</td>
                            <td >{searchdata.Email}</td>
                            <td>{searchdata.Phone_number}</td>
                            <td>{searchdata.Country}</td>
                            <td><div className='edit-del-icon'>
                                <img src="/pencil.png" alt="pencil" />  <img src="/trash.png" alt="trash" />
                            </div></td>
                        </tr>
                        : pagedcontact.map((item, i) => {
                            return (
                                <tr className='table-content-wrap' key={item._id}>
                                    <td><div><input type="checkbox"
                                        value={item._id} name="" id={item._id}
                                        onChange={(e) => handleCheckBox(e, item._id)}
                                    /></div></td>
                                    <td>{item.Name}</td>
                                    <td>{item.Designation}</td>
                                    <td>{item.Industry}</td>
                                    <td>{item.Company}</td>
                                    <td title={item.Email}>{item.Email}</td>
                                    <td>{item.Phone_number}</td>
                                    <td>{item.Country}</td>
                                    <td><div className='edit-del-icon'>
                                        <img src="/pencil.png" alt="pencil" />
                                        <img src="/trash.png" onClick={(e) => handleDelete(e, item._id)} alt="trash" />
                                    </div></td>
                                </tr>
                            )
                        }

                        )
                    }




                </tbody>


            </table>
        </div>
    )
}


import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
export default function Protected_route() {
    const token = window.localStorage.getItem("jwt")
    return (
        <>
            {token ? <Outlet /> : <Navigate to={"/"} />}
        </>
    )
}

import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const user = useSelector((state:RootState)=>state.user.user)
    if(!user){
        return <Navigate to='/login'/>
    }else
  return <Outlet/>
}

export default ProtectedRoute
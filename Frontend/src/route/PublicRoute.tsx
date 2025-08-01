import {  useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import type { RootState } from '../store/store'

const PublicRoute = () => {
    const user = useSelector((state:RootState)=>state.user.user)
    if(user){
        return <Navigate to="/" />
    }
  return <Outlet/>
}

export default PublicRoute
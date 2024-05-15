import React, { useContext } from 'react'
import { MyContext } from '../Auth/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const Admin = ({ children }) => {
    const { user, loading } = useContext(MyContext)
    const location = useLocation();

    if (loading) {
        return <div className='h-screen w-full flex justify-center items-center'>
            <span className="loading loading-spinner text-primary"></span>
            <span className="loading loading-spinner text-secondary"></span>
            <span className="loading loading-spinner text-accent"></span>
            <span className="loading loading-spinner text-neutral"></span>
        </div>
    }

    if (user && user?.reloadUserInfo?.email === 'sahin@gmail.com') {
        return children;
    }

    return (
        <Navigate state={location.pathname} to='/login'></Navigate>
    )
}

export default Admin
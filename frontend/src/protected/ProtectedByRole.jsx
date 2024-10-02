import React from 'react'
import jwt from 'jsonwebtoken'

const switchByRole = (role) => {
    switch(role) {
        case 'Student':return <Navigate to="/main-page-user"/>
        case 'Confidant':return <Navigate to="/main-page-admin"/>
    }
}
const ProtectedByRole = (isRole) => {
    const token = localStorage.getItem('token');
    const role = jwt.decode(token);
    return isRole == role ? <Outlet /> : switchByRole(role);
}
export default ProtectedByRole
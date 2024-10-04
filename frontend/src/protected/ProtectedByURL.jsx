import jwt from 'jsonwebtoken'
import { Navigate, Outlet } from 'react-router-dom'

const switchByRole = (role) => {
    switch(role) {
        case 'Student':return <Navigate to="/main-page-user"/>
        case 'Confidant':return <Navigate to="/main-page-admin"/>
    }
}
const ProtectedByRole = ({isAuth}) => {
    const token = localStorage.getItem('token');
    const role = jwt.decode(token).role;
    return isAuth ? <Outlet /> : switchByRole(role);
}
export default ProtectedByRole
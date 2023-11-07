import {
    useLocation,
    Navigate
} from "react-router-dom"

import { useAuth } from "../main"

export default function RequireAuth( {children} ) {
    let Auth = useAuth();
    let location = useLocation();
    const getUserStorage = localStorage.getItem('token')
    if(!getUserStorage) {
        return <Navigate to={'/login'} state={{from: location}} replace/>
    }
    return children;
}
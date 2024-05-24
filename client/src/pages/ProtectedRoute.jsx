import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoute = () => {
    const user = useSelector((state) => state.user.user)
    const navigate = useNavigate();

    user ? (
        <Outlet/>
    ) : (
        <Navigate to='/' />
    )
}

export default ProtectedRoute
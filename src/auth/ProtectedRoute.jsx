import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    if (role !== allowedRole) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;
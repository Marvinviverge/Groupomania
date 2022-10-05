import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
    let logged = false

    if (!logged) {
        <Navigate to="auth/login" />

    } else return children
};

export default AuthGuard;
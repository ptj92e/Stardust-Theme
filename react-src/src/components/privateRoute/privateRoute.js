import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const { userToken } = JSON.parse(localStorage.getItem('auth-info'));

    if (userToken === null) {
        return <Navigate to='/' />;
    }
    
    return children;
}

export default PrivateRoute;

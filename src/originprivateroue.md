// origin private route
import React from 'react';
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode correctly
import { useAuth } from './hook/EmailProvider';

const PrivateRoutes = ({ children }) => {
    const authToken = useAuth(); // Get the token from context or wherever it's stored

    // const isTokenValid = (token) => {
    //     try {
    //         const decodedToken = jwtDecode(token);
    //         const currentTime = Date.now() / 1000;
    //         return decodedToken.exp > currentTime;
    //     } catch (err) {
    //         return false;
    //     }
    // };

    // return isTokenValid(authToken) ? children : <Navigate to="/login" />;
    return authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;





// Test Private route 

import React from 'react';
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;

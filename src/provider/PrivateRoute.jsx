import React, { useContext } from 'react'
import { AuthContent } from './authContent'
import { Navigate, useLocation } from 'react-router';

function PrivateRoute({children}) {
  const {user} =  useContext(AuthContent);
  const location = useLocation();


  if (user && user?.email) {
    return children
}


return <Navigate to={'/register'} state={location.pathname}> </Navigate>


}

export default PrivateRoute

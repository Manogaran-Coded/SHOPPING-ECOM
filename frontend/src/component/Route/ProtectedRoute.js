import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet} from 'react-router-dom';
import { userReducer } from '../../reducers/userReducer';
//import {Redirect}

const ProtectedRoute = ({isAuthenticated,user,children,isAdmin}) => {
 //const {user}=useSelector((state) => state.user);
 
 //console.log("Role"+user.role);

  if(!isAuthenticated){
   return  <Navigate to={"/login"} />;

  }
  if(isAdmin===true && user.role !=="admin")
  {
    
    return  <Navigate to={"/login"} />;
  }
  return children?children:<Outlet />;


};

export default ProtectedRoute;

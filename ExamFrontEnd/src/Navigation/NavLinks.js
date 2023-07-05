import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../user/pages/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);
  console.log("nav link test");
  console.log(auth.userId);
  console.log(auth);
  return <ul className="nav-links">
    {/* {console.log(auth.userType)}
    { console.log(auth.userId)} */}

{/* {auth.isLoggedIn && auth.userType=="superadmin" &&(
      <li>
        <NavLink to="/signupadmin" exact>Create User</NavLink>
      </li>
      
      )}


    {auth.isLoggedIn && (
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>)} */}

    {/* {auth.isLoggedIn && (auth.userType=="teacher" || auth.userType=="superadmin") && (
      <li>
        <NavLink to={`/${auth.userId}/questions`}>MY Questions</NavLink>
      </li>)} */}

     <li>
        <NavLink to="/examdef">Create Exam def</NavLink>
      </li>

      <li>
        <NavLink to="/assignexam">Assign Exam</NavLink>
      </li>
    {/* {!auth.isLoggedIn && (
      <li>
        <NavLink to="/login">Log in</NavLink>
      </li>)}

   
      <li>
        <NavLink to="/signup">Sign up</NavLink>
      </li> */}
      

    {/* {auth.isLoggedIn && (
      <li>
        <NavLink to="/allquestions">ALL QUESTIONS</NavLink>
      </li>)} */}
    {auth.isLoggedIn && (
      <li>
        <button onClick={auth.logout}>LOGOUT</button>
      </li>
    )}
  </ul>
};

export default NavLinks;
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../user/pages/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);
  
  return <ul className="nav-links">
    {/* {console.log(auth.userType)}
    { console.log(auth.userId)} */}

    {/* {auth.isLoggedIn && auth.userType == "superadmin" && (
      <li>
        <NavLink to="/signupadmin" exact>Create User</NavLink>
      </li>)} */}


    {auth.isLoggedIn && (
      <li>
        <NavLink to="/" exact>ALL USERS</NavLink>
      </li>)}

    {auth.isLoggedIn && auth.userType == "teacher" &&(
      <li>
        <NavLink to={`/${auth.userId}/questions`}>MY Questions</NavLink>
      </li>)}

    {auth.isLoggedIn && (auth.userType == "teacher") && (
      <li>
        <NavLink to="/questions/new">ADD Question</NavLink>
      </li>)}
      {auth.isLoggedIn && (auth.userType == "teacher") && (
      <li>
        <NavLink to="/examdef">ADD Exam Definition</NavLink>
      </li>)}
      {auth.isLoggedIn && (auth.userType == "teacher") && (
      <li>
        <NavLink to="/showexamdef">ALL Exam Definition</NavLink>
      </li>)}

      {auth.isLoggedIn && (auth.userType == "teacher") && (
      <li>
        <NavLink to="/assign">Assin Exam</NavLink>
      </li>)}

    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/login">Log in</NavLink>
      </li>)}

    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/signup">Sign up</NavLink>
      </li>)}

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
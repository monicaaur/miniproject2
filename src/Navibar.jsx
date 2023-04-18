import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, } from 'react-bootstrap';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import './index.css'
import './Navibar.css'

function Navibar() {        
  const location = useLocation();

  const [username, setUsername] = useState();

  useEffect(() => {
    if(localStorage.getItem("sessionID")) {
      const getAccount = async () => {
        const response = await Axios.get(
          `https://api.themoviedb.org/3/account?api_key=d16f4dafe652594029c33c9a44e3462f&session_id=${localStorage.getItem("sessionID")}`
        );
        setUsername(response.data.username);
      };
      getAccount()
    };
  }, []);

  const handleSigninSignout = () => {
    if(localStorage.getItem("sessionID")) {
      const handleSignOut = async () => {
        await Axios({
          method: "delete",
          url:`https://api.themoviedb.org/3/authentication/session?api_key=d16f4dafe652594029c33c9a44e3462f`,
          data: {
            session_id: localStorage.getItem("sessionID")
          },
        });
        localStorage.removeItem("sessionID");
        window.location.assign("/");
      };
      return (
        <Nav.Link className="nav_signin" onClick={handleSignOut}>Sign Out</Nav.Link>
      );
    }

    return (
      <Nav.Link className={[location.pathname === '/signin' ? 'active' : 'inactive', 'nav_signin']} href="/signin">Sign In</Nav.Link>
    );
  };

  const renderUsername = () => {
    return (
      <li className="nav-link nav_username">{username}</li>
    );
  };

  return (
    <Container fluid>
      <Navbar expand="lg" fixed="top" bg="body-tertiary" dark>
        <Container fluid>
          <Navbar.Brand className='navbar-title'>Mubii.</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link href="/" className={[location.pathname === '/' ? 'active' : 'inactive', 'navlink_style']}>Movie</Nav.Link>
              <Nav.Link href="/TrendingTV" className={[location.pathname === '/TrendingTV' ? 'active' : 'inactive', 'navlink_style']}>TV Show</Nav.Link>
            </Nav>
            <Nav className="mb-2 mb-lg-0">
              {renderUsername()}
              {handleSigninSignout()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  )
}

export default Navibar
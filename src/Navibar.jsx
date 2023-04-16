import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button, Form } from 'react-bootstrap';
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
          url:"https://api.themoviedb.org/3/authentication/session?api_key=d16f4dafe652594029c33c9a44e3462f",
          data: {
            session_id: localStorage.getItem("sessionID")
          },
        });
        localStorage.removeItem("sessionID");
        window.location.assign("/");
      };
      return (
        <Nav.Link className="nav_signin" onClick={handleSignOut} style={{fontSize: "18px"}}>Sign Out</Nav.Link>
      );
    }

    return (
      <Nav.Link className="nav_signin" href="/signin" style={{fontSize: "18px"}}>Sign In</Nav.Link>
    );
  };

  const renderUsername = () => {
    return (
      <li className="nav-link nav_username" style={{fontSize: "18px"}}>{username}</li>
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
              <Nav.Link href="/" className={location.pathname === '/' ? 'active' : 'inactive'} style={{fontSize: "18px"}}>Movie</Nav.Link>
              <Nav.Link href="/TrendingTV" className={location.pathname === '/TrendingTV' ? 'active' : 'inactive'} style={{fontSize: "18px"}}>TV Show</Nav.Link>
            </Nav>
            {/* <Form className="d-flex search_wrap">
              <Form.Control type="search" placeholder="Search.." className="search_box me-2" aria-label="Search" />
              <Button variant="link" type="submit" className="btn_search">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"> 
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
              </Button>
            </Form> */}
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
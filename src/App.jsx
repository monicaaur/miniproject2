import { Container, Nav, Navbar, Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './index.css'

function App() {        
  const location = useLocation();

  return (
    <Container fluid>
      <Navbar expand="lg" fixed="top" bg="body-tertiary" dark>
        <Container fluid>
          <Navbar.Brand className='navbar-title'>Mubii.</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link href="/" className={location.pathname === '/' ? 'active' : 'inactive'}>Home</Nav.Link>
              <Nav.Link href="/new-arrival" className={location.pathname === '/new-arrival' ? 'active' : 'inactive'}>New Arrival</Nav.Link>
              <Nav.Link href="/movie" className={location.pathname === '/movie' ? 'active' : 'inactive'}>Movie</Nav.Link>
              <Nav.Link href="/animation" className={location.pathname === '/animation' ? 'active' : 'inactive'}>Animation</Nav.Link>
              <Nav.Link href="/jp-anime" className={location.pathname === '/jp-anime' ? 'active' : 'inactive'}>Japanese Anime</Nav.Link>
            </Nav>
            <Form className="d-flex search_wrap">
              <Form.Control type="search" placeholder="Search.." className="search_box me-2" aria-label="Search" />
              <Button variant="link" type="submit" className="btn_search">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"> 
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
              </Button>
            </Form>
            <Nav className="mb-2 mb-lg-0">
              <Nav.Link className="nav_signin" href="#">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  )
}

export default App
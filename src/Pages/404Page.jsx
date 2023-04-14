import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import '../index.css'

function Page404() {
  useEffect(() => {
    document.title = "404 Page"
  }, []);

  return (
    <Container fluid className='d-flex justify-content-center align-items-center Page404_wrapper'>
      <h1>404 <br/>Page not Found</h1>
    </Container>
  )
}

export default Page404
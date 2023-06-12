import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Container, Form, Row, Col, Card, Modal, Button, CloseButton } from "react-bootstrap"
import "../../index.css";
import "./Content.css"

function TVContent() {
  const [tvData, setTVData] = useState([])
  const [query, setQuery] = useState("");
    
  useEffect( async () => {
    await Axios.get(`${import.meta.env.VITE_BASEURL}/trending/tv/day?api_key=${import.meta.env.VITE_APIKEY}`)

    .then((response) => {
      setTVData(response.data.results.slice(0,18))
    })
  }, [])

  const searchTVShow = async () => {
    await Axios.get(`${import.meta.env.VITE_BASEURL}/search/tv?api_key=${import.meta.env.VITE_APIKEY}&query=${query}`)
    .then((response) => {
      console.log(response.data.results);
      setTVData(response.data.results);
    })
};

  const handleSubmit = (e) => {
    e.preventDefault();
    searchTVShow();
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
};

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  return (
    <div>
      <Container fluid className="content_wrapper">
        <Form className="d-flex search_wrap" onSubmit={handleSubmit}>
          <Form.Control
          type="search" placeholder="Search.."
          className="search_box me-2"
          aria-label="Search"
          value={query}
          onChange={handleChange}
          />
          <Button variant="link" type="submit" className="btn_search">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"> 
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
          </Button>
        </Form>

        {tvData.length > 0 ? (
        <div>
          <h2 className="content_title">Trending TV Shows</h2>

          <Row>
            {tvData.map((tv, i) => ( 
              <><Col lg="2" md="4" sm="6" key={tv.id}>
                <Card className="card_border">
                  <a className='movie_modal' onClick={() => handleShow(tv.id)}>
                    <Card.Img src={`${import.meta.env.VITE_BASEIMGURL}${tv.poster_path}`} className="card-img-top rounded-3" alt={tv.name}/>
                    <Card.Body>
                      <Card.Title>{tv.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Popularity: {tv.popularity}</Card.Subtitle>
                    </Card.Body>
                  </a>
                </Card>
              </Col>
              
              <Modal show={show === tv.id} onHide={() => handleClose()} aria-labelledby="contained-modal-title-vcenter" centered>
                <div class="close-wrap">
                  <CloseButton variant="white" aria-label="Close" onClick={() => handleClose()}/>
                </div>
                <Modal.Body style={{padding: "5px 0 0", marginBottom: "-5px"}}>
                  <div className="poster-wrap">
                    <img className='poster' src={`${import.meta.env.VITE_BASEIMGURL}${tv.backdrop_path}`} alt={tv.name}/>
                    <div className="poster-title">
                      <h1>{tv.name}</h1>
                    </div>
                    <div className="poster-content">
                      <p className="movie_info">ID: {tv.id} | First Aired Date: {tv.first_air_date}</p>
                      <p className="overview">{tv.overview}</p>
                      <p className="movie_info mb-0">Vote Average: {tv.vote_average}</p>
                    </div>

                    <div className="modal_button_wrap">
                      <div style={{paddingRight: "5px"}}>
                        <Button type="button" variant='danger' className="btn-watch">
                          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-play-fill" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>Watch Now
                        </Button>
                      </div>
                      <div style={{padding: "0 5px"}}>
                        <Button type="button" variant='outline-danger' className="btn-trailer">Watch Trailer</Button>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
              </>
            ))}
          </Row>
        </div>
        ) : (
          <div>
            <h1 className="text-center keywords_style">There are no tv shows that matched your keywords.</h1>
          </div>
        )}
      </Container>
    </div>
  )
}

export default TVContent
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Container, Form, Row, Col, Card, Modal, Button, CloseButton } from "react-bootstrap"
import "../../index.css";
import "./Content.css"

function MovieContent() {
  const [movieData, setMovieData] = useState([])
  const [query, setQuery] = useState("");
    
  useEffect( async () => {
    await Axios.get(`${import.meta.env.VITE_BASEURL}/trending/movie/week?api_key=${import.meta.env.VITE_APIKEY}`)

    .then((response) => {
      setMovieData(response.data.results.slice(0, 18))
    })
  }, [])

  const searchMovie = async () => {
    await Axios.get(`${import.meta.env.VITE_BASEURL}/search/movie?api_key=${import.meta.env.VITE_APIKEY}&query=${query}`)
    .then((response) => {
      console.log(response.data.results);
      setMovieData(response.data.results);
    })
};

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovie();
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
          type="search" 
          placeholder="Search.." 
          className="search_box me-2" 
          aria-label="Search" 
          value={query} 
          onChange={handleChange}/>
          <Button variant="link" type="submit" className="btn_search">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"> 
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
          </Button>
        </Form>
        {movieData.length > 0 ? (
        <div>
          <h2 className="content_title">Trending Movies</h2>

          <Row>
            {movieData.map((movie, i) => ( 
              <><Col lg="2" md="4" sm="6" key={movie.id}>
                <Card className="card_border">
                  <a className='movie_modal' onClick={() => handleShow(movie.id)}>
                    <Card.Img src={`${import.meta.env.VITE_BASEIMGURL}${movie.poster_path}`} className="card-img-top rounded-3" alt={movie.title}/>
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Popularity: {movie.popularity}</Card.Subtitle>
                    </Card.Body>
                  </a>
                </Card>
              </Col>
              
              <Modal show={show === movie.id} onHide={() => handleClose()}>
                <div class="close-wrap">
                  <CloseButton variant="white" aria-label="Close" onClick={() => handleClose()}/>
                </div>
                <Modal.Body style={{padding: "5px 0 0", marginBottom: "-5px"}}>
                  <div className="poster-wrap">
                    <img className='poster' src={`${import.meta.env.VITE_BASEIMGURL}${movie.backdrop_path}`} alt={movie.title}/>
                    <div className="poster-title">
                      <h1>{movie.title}</h1>
                    </div>
                    <div className="poster-content">
                      <p className="movie_info">ID: {movie.id} | Release Date: {movie.release_date}</p>
                      <p className="overview">{movie.overview}</p>
                      <p className="movie_info mb-0">Vote Average: {movie.vote_average}</p>
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
            <h1 className="text-center keywords_style">There are no movies that matched your keywords.</h1>
          </div>
        )}
      </Container>
    </div>
  )
}

export default MovieContent
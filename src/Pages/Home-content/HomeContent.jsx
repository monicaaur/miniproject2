import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Container, Row, Col, Card, Modal, Button, Collapse, CloseButton } from "react-bootstrap"
import "../../index.css";

function HomeContent(props) {
    const [movieData, setMovieData] = useState([])
    
    const getMovieData = () => {
        const ids = props.ids;
        const requests = ids.map((id) => {
            const movieDetails = Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d16f4dafe652594029c33c9a44e3462f`)
            
            const movieTrailer = Axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=d16f4dafe652594029c33c9a44e3462f`)

            return Promise.all([movieDetails, movieTrailer])

        })

        Promise.all(requests)
        .then((responses) => {
        setMovieData(responses.map(([movieDetails, movieTrailer]) => {
            const movie = movieDetails.data
            movie.trailer = movieTrailer.data.results.filter((video) => video.type === "Trailer")[0]
            return movie
        }))
        });  
    }

    useEffect(() => {
        getMovieData()
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id) => setShow(id);

    const [open, setOpen] = useState(false);

    return (
        <div>
            <Container fluid className="content_wrapper">
                <h2><a className="content_title" href={props.router}>{props.title}</a></h2>

                <Row>
                    
                    {movieData.map((movie, i) => ( 
                        <><Col lg="2" md="4" sm="6" key={i}>
                            <Card className="card_border">
                                <a className='movie_modal' onClick={() => handleShow(movie.id)}>
                                    <Card.Img src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`} className="card-img-top rounded-3" alt={movie.title}/>
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
                                <img className='poster' src={`https://www.themoviedb.org/t/p/original${movie.backdrop_path}`} alt={movie.title}/>
                                <div className="poster-title">
                                    <h1>{movie.title}</h1>
                                </div>
                                <div className="poster-content">
                                    <p className="movie_info">ID: {movie.id} | Release Date: {movie.release_date}</p>
                                    <p className="overview">{movie.overview}</p>
                                    <p className="movie_info mb-0">Popularity: {movie.popularity}</p>
                                </div>

                                <div className="modal_button_wrap">
                                    <div style={{paddingRight: "5px"}}>
                                        <Button type="button" variant='danger' className="btn-watch">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-play-fill" viewBox="0 0 16 16">
                                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                            </svg>Watch Now</Button>
                                    </div>
                                    <div style={{padding: "0 5px"}}>
                                        <Button type="button" variant='outline-danger' className="btn-trailer" onClick={() => setOpen(!open)} aria-controls="trailer-video" aria-expanded={open}>Watch Trailer</Button>
                                    </div>
                                </div>
                                
                                <Collapse in={open} id="trailer-video" style={{padding: "20px 20px 0"}}>
                                    <iframe width="100%" height="260px" src={`https://www.youtube.com/embed/${movie.trailer.key}`} frameborder="0" allowfullscreen></iframe>
                                </Collapse>
                            </div>
                        </Modal.Body>
                    </Modal>
                    </>
                    ))}

                    <div className="more_button">
                        <a href={props.router}>more..</a>
                    </div>
                </Row>
            </Container>

        </div>
    )
}

export default HomeContent
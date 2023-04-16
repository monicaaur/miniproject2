import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Container, Row, Col, Card, Modal, Button, Collapse, CloseButton } from "react-bootstrap"
import "../../index.css";
import "./Content.css"

function TVContent() {
  const [tvData, setTVData] = useState([])
    
  const getTVData = async () => {
    await Axios.get("https://api.themoviedb.org/3/trending/tv/day?api_key=d16f4dafe652594029c33c9a44e3462f")

    .then((trending) => {
      const requests = trending.data.results.slice(0, 18).map(async (tv) => {
        const tvDetails = await Axios.get(`https://api.themoviedb.org/3/tv/${tv.id}?api_key=d16f4dafe652594029c33c9a44e3462f`)
              
        const tvTrailer = await Axios.get(`https://api.themoviedb.org/3/tv/${tv.id}/videos?api_key=d16f4dafe652594029c33c9a44e3462f`)

        return Promise.all([tvDetails, tvTrailer])
      })

      Promise.all(requests)
      .then((responses) => {
        setTVData(responses.map(([tvDetails, tvTrailer]) => {
          const tv = tvDetails.data
          tv.trailer = tvTrailer.data.results.filter((video) => video.type === "Trailer")[0]
          return tv;
        }))
      });  
    })
  }

  useEffect(() => {
    getTVData()
  }, [])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Container fluid className="content_wrapper">
        <h2 className="content_title">Trending TV Show</h2>

        <Row>
          {tvData.map((tv, i) => ( 
            <><Col lg="2" md="4" sm="6" key={tv.id}>
              <Card className="card_border">
                <a className='movie_modal' onClick={() => handleShow(tv.id)}>
                  <Card.Img src={`https://www.themoviedb.org/t/p/original${tv.poster_path}`} className="card-img-top rounded-3" alt={tv.title}/>
                  <Card.Body>
                    <Card.Title>{tv.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Popularity: {tv.popularity}</Card.Subtitle>
                  </Card.Body>
                </a>
              </Card>
            </Col>
            
            <Modal show={show === tv.id} onHide={() => handleClose()}>
              <div class="close-wrap">
                <CloseButton variant="white" aria-label="Close" onClick={() => handleClose()}/>
              </div>
              <Modal.Body style={{padding: "5px 0 0", marginBottom: "-5px"}}>
                <div className="poster-wrap">
                  <img className='poster' src={`https://www.themoviedb.org/t/p/original${tv.backdrop_path}`} alt={tv.name}/>
                  <div className="poster-title">
                    <h1>{tv.name}</h1>
                  </div>
                  <div className="poster-content">
                    <p className="movie_info">ID: {tv.id} | First Aired Date: {tv.first_air_date}</p>
                    <p className="overview">{tv.overview}</p>
                    <p className="movie_info mb-0">Popularity: {tv.popularity}</p>
                  </div>

                  <div className="modal_button_wrap">
                    <div style={{paddingRight: "5px"}}>
                      <Button type="button" variant='danger' className="btn-watch">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>Watch Now
                      </Button>
                    </div>
                    <div style={{padding: "0 5px"}}>
                      <Button type="button" variant='outline-danger' className="btn-trailer" onClick={() => setOpen(!open)} aria-controls="trailer-video" aria-expanded={open}>Watch Trailer</Button>
                    </div>
                  </div>
                    
                  <Collapse in={open} id="trailer-video" style={{padding: "20px 20px 0"}}>
                    <iframe width="100%" height="260px" src={`https://www.youtube.com/embed/${tv.trailer.key}`} frameborder="0" allowfullscreen></iframe>
                  </Collapse>
                </div>
              </Modal.Body>
            </Modal>
            </>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default TVContent
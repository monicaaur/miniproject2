import { Carousel } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import Axios from "axios";
import HomeContent from "./Home-content/HomeContent";
import ComingSoonContent from "./Home-content/ComingSoonContent";
import '../index.css';

function Home() {
  const newArrivalIds = [768362, 717980, 640146, 631842, 700391, 850028];
  const newArrivalTitle = "New Arrival";
  const newArrivalRouter = "/new-arrival"

  const movieIds = [634649, 453395, 505642, 585216, 566525, 337401];
  const movieTitle = "Movie";
  const movieRouter = "/movie";

  const animationIds = [774825, 629542, 897192, 774741, 527774, 568124];
  const animationTitle = "Animation";
  const animationRouter = "/animation";

  const animeIds = [912598, 810693, 683127, 283566, 635302, 568160];
  const animeTitle = "Japanese Anime";
  const animeRouter = "/jp-anime";

  const comingSoonIds = [594767, 804150, 420808, 502356, 447365, 447277];
  const comingSoonTitle = "Coming Soon";

  const [movieData, setMovieData] = useState([])
    
  const getMovieData = () => {
    const ids = [768362, 717980, 640146, 700391];
    const requests = ids.map((id) => {
      const movieDetails = Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d16f4dafe652594029c33c9a44e3462f`)

      const landscapePoster = Axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=d16f4dafe652594029c33c9a44e3462f&include_image_language=en`)

      return Promise.all([movieDetails, landscapePoster])
    })

    Promise.all(requests)
    .then((responses) => {
    setMovieData(responses.map(([movieDetails, landscapePoster]) => {
      const movie = movieDetails.data
      movie.landscape = landscapePoster.data.backdrops[0]
      return movie
    }))
    });  
  }

  useEffect(() => {
    getMovieData()
  }, [])

  const location = useLocation();

  return (
    <div>
      <Carousel>
        {movieData.map((movie, i) => (
          <Carousel.Item interval={5000} key={i}>
            <img className="d-block w-100" src={`https://www.themoviedb.org/t/p/original${movie.landscape.file_path}`} alt={movie.title}/>
          </Carousel.Item>
        ))}
      </Carousel>

      <HomeContent ids={newArrivalIds} title={newArrivalTitle} router={newArrivalRouter}/>

      <HomeContent ids={movieIds} title={movieTitle} router={movieRouter}/>

      <HomeContent ids={animationIds} title={animationTitle} router={animationRouter}/>

      <HomeContent ids={animeIds} title={animeTitle} router={animeRouter}/>

      <ComingSoonContent ids={comingSoonIds} title={comingSoonTitle}/>
    </div>
  )
}

export default Home
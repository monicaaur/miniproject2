import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";
import Axios from "axios";
import MovieContent from "./Content/MovieContent";
import '../index.css';

function TrendingMovie() {
  const [movieData, setMovieData] = useState([])

  const getMovieData = async () => {
    await Axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=d16f4dafe652594029c33c9a44e3462f")

    .then((trending) => {
      const requests = trending.data.results.slice(0, 5).map(async (movie) => {
        const movieDetails = await Axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=d16f4dafe652594029c33c9a44e3462f`)
              
        const landscapePoster = Axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=d16f4dafe652594029c33c9a44e3462f&include_image_language=en`)

        return Promise.all([movieDetails, landscapePoster])
      })

      Promise.all(requests)
      .then((responses) => {
      setMovieData(responses.map(([movieDetails, landscapePoster]) => {
        const movie = movieDetails.data
        movie.landscape = landscapePoster.data.backdrops[0]
        return movie;
      }))
      });  
    })
  }

  useEffect(() => {
    getMovieData()
  }, [])

  return (
    <div>
      <Carousel>
        {movieData.map((movie, i) => (
          <Carousel.Item interval={5000} key={i}>
            <img className="d-block w-100" src={`https://www.themoviedb.org/t/p/original${movie.landscape.file_path}`} alt={movie.title}/>
          </Carousel.Item>
        ))}
      </Carousel>

      <MovieContent />
    </div>
  )
}

export default TrendingMovie
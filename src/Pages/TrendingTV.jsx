import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";
import Axios from "axios";
import TVContent from "./Content/TVContent";
import '../index.css';

function TrendingTV() {
  const [tvData, setTVData] = useState([])

  const getTVData = async () => {
    await Axios.get("https://api.themoviedb.org/3/trending/tv/week?api_key=d16f4dafe652594029c33c9a44e3462f")

    .then((trending) => {
      const requests = trending.data.results.slice(0, 5).map(async (tv) => {
        const tvDetails = await Axios.get(`https://api.themoviedb.org/3/tv/${tv.id}?api_key=d16f4dafe652594029c33c9a44e3462f`)
              
        const landscapePoster = Axios.get(`https://api.themoviedb.org/3/tv/${tv.id}/images?api_key=d16f4dafe652594029c33c9a44e3462f&include_image_language=en`)

        return Promise.all([tvDetails, landscapePoster])
      })

      Promise.all(requests)
      .then((responses) => {
      setTVData(responses.map(([tvDetails, landscapePoster]) => {
        const tv = tvDetails.data
        tv.landscape = landscapePoster.data.backdrops[0]
        return tv;
      }))
      });  
    })
  }

  useEffect(() => {
    getTVData()
  }, [])

  return (
    <div>
      <Carousel>
        {tvData.map((tv, i) => (
          <Carousel.Item interval={5000} key={i}>
            <img className="d-block w-100" src={`https://www.themoviedb.org/t/p/original${tv.landscape.file_path}`} alt={tv.name}/>
          </Carousel.Item>
        ))}
      </Carousel>

      <TVContent />
    </div>
  )
}

export default TrendingTV
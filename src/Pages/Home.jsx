import { Carousel, Container, Row, Col, Card } from "react-bootstrap";
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

    return (
        <div>
            <Carousel>
                <Carousel.Item interval={5000} active>
                    <img className="d-block w-100" src="https://www.themoviedb.org/t/p/original/fDiaDJfoZhpdfUV6GtpyWLHgS0.jpg" alt="Missing"/>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img className="d-block w-100" src="https://www.themoviedb.org/t/p/original/sgpw2lB00tUuyw9kJCZt5NwbX0M.jpg" alt="Sharper"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="https://www.themoviedb.org/t/p/original/tlZBdyjh12tBJH4EW047hEigShA.jpg" alt="Antman and The Wasp: Quantumania"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="https://www.themoviedb.org/t/p/original/cJxWyYfYXmHGFYDQXKkyHcxsbvh.jpg" alt="Knock at The Cabin"/>
                </Carousel.Item>
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
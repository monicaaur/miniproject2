import '../index.css'
import Page2 from './Page2';

function Movie() {
    const movieIds = [634649, 453395, 505642, 585216, 566525, 337401, 454626, 447404, 512200, 489999, 316029, 10020];
    const movieTitle = 'Movie'

    return (
        <Page2 ids={movieIds} title={movieTitle}/>
    )
}

export default Movie
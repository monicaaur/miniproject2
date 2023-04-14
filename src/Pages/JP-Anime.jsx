import '../index.css'
import Page2 from './Page2';
import { useEffect } from 'react';

function JPAnime() {
  const animeIds = [912598, 810693, 683127, 283566, 635302, 568160, 604605, 430447, 149870, 198375, 129, 8392];
  const animeTitle = "Japanese Anime";

  useEffect(() => {
    document.title = "Mubi | Japanese Anime"
  }, []);

  return (
    <Page2 ids={animeIds} title={animeTitle}/>
  )
}

export default JPAnime
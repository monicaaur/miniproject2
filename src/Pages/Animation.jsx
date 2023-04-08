import '../index.css'
import Page2 from './Page2';

function Animation() {
    const animationIds = [774825, 629542, 897192, 774741, 527774, 568124, 508943, 400160, 354912, 269149, 277834, 105864];
    const animationTitle = "Animation";

    return (
        <Page2 ids={animationIds} title={animationTitle}/>
    )
}

export default Animation;
import '../index.css'
import Page2 from './Page2';

function NewArrival() {
    const newArrivalIds = [768362, 717980, 640146, 631842, 700391, 850028, 707103, 667216, 315162, 76600, 937278, 536554];
    const newArrivalTitle = "New Arrival";

    return (
        <Page2 ids={newArrivalIds} title={newArrivalTitle}/>
    )
}

export default NewArrival;
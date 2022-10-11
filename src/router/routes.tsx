import Counter from "../pages/Counter/Counter";
import ModalWindow from "../pages/Modal/ModalWindow";
import Quiz from "../pages/Quiz/Quiz";


export const publicRoutes= [
    {path: '/counter',element:(<Counter/>),linkName:'counter'},
    {path: '/modal',element:(<ModalWindow/>),linkName:'modal'},
    {path: '/quiz', element: (<Quiz/>),linkName: 'quiz'},

    {path: '*',element:(<div>404 NOT FOUND</div>)}
]

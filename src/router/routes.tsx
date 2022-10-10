import Counter from "../pages/Counter/Counter";
import ModalWindow from "../pages/Modal/ModalWindow";


export const publicRoutes= [
    {path: '/counter',element:(<Counter/>),linkName:'counter'},
    {path: '/modal',element:(<ModalWindow/>),linkName:'modal'},

    {path: '*',element:(<div>404 NOT FOUND</div>)}
]

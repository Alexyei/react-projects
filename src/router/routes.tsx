import Counter from "../pages/Counter/Counter";
import ModalWindow from "../pages/Modal/ModalWindow";
import Quiz from "../pages/Quiz/Quiz";
import UserList from "../pages/UserList/UserList";
import CurrencyCalculator from "../pages/CurrencyCalculator/CurrencyCalculator";
import PhotoCollection from "../pages/PhotosCollection/PhotosCollection";


export const publicRoutes= [
    {path: '/counter',element:(<Counter/>),linkName:'counter'},
    {path: '/modal',element:(<ModalWindow/>),linkName:'modal'},
    {path: '/quiz', element: (<Quiz/>),linkName: 'quiz'},
    {path: '/user-list',element: (<UserList/>), linkName: 'userList'},
    {path: '/currency-calculator',element: (<CurrencyCalculator/>), linkName: 'currencyCalculator'},
    {path: '/photo-collection',element: (<PhotoCollection/>),linkName: 'photoCollection'},

    {path: '*',element:(<div>404 NOT FOUND</div>)}
]

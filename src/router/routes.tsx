import Counter from "../pages/Counter/Counter";
import ModalWindow from "../pages/Modal/ModalWindow";
import Quiz from "../pages/Quiz/Quiz";
import UserList from "../pages/UserList/UserList";


export const publicRoutes= [
    {path: '/counter',element:(<Counter/>),linkName:'counter'},
    {path: '/modal',element:(<ModalWindow/>),linkName:'modal'},
    {path: '/quiz', element: (<Quiz/>),linkName: 'quiz'},
    {path: '/user-list',element: (<UserList/>), linkName: 'userList'},

    {path: '*',element:(<div>404 NOT FOUND</div>)}
]

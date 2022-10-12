import {FC, useEffect, useMemo, useState} from "react";
import classes from "./UserList.module.scss"
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
    <ContentLoader
        speed={2}
        width={270}
        height={50}
        viewBox="0 0 320 50"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <circle cx="25" cy="25" r="25" />
        <rect x="64" y="0" rx="6" ry="6" width="137" height="25" />
        <rect x="64" y="32" rx="6" ry="6" width="183" height="15" />
        <rect x="290" y="12" rx="6" ry="6" width="26" height="26" />
    </ContentLoader>
);

const User: FC<{user:User,isSelected:boolean, onActive: (user:User)=>void}> = ({user,onActive,isSelected}) => {

    const svgLink = useMemo(()=>{
        if (isSelected){
            return "/assets/minus.svg"
        }
        else{
            return "/assets/plus.svg"
        }
    },[isSelected])

    function onActionHandler(){
        onActive( user);
    }

    return (<>
        <div>
            <img className={classes.avatar} src={user.avatar} alt="User"/>
            <div className={classes.center__section}>
                <h3>{user.name}</h3>
                <p>
                    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M48,0a48,48,0,0,0,0,96,6,6,0,0,0,0-12A36,36,0,1,1,84,48V66a6,6,0,0,1-12,0V48A24,24,0,1,0,48,72a23.7365,23.7365,0,0,0,12.2549-3.4783A17.9586,17.9586,0,0,0,96,66V48A48.0474,48.0474,0,0,0,48,0Zm0,60A12,12,0,1,1,60,48,12.0081,12.0081,0,0,1,48,60Z"/>
                    </svg>
                    {user.email}
                </p>
            </div>
        </div>
        <img onClick={onActionHandler} className={classes.action} src={svgLink} alt="Action"/>
    </>)
}

const UsersView: FC<{users:User[], isLoading: boolean, onSend: (selectedUsers:User[])=>void }> = ({onSend,isLoading, users}) => {
    const [filter, setFilter] = useState("")
    const [selectedUsers, setSelectedUsers] = useState<User[]>([])

    const filteredUsers = useMemo(()=>{
        return users.filter((u)=>
            u.name.toLowerCase().includes(filter.toLowerCase())
            || u.email.toLowerCase().includes(filter.toLowerCase())
        )
    },[users,filter])

    function checkUserSelected(user:User) {
        return selectedUsers.some((u)=>u.id === user.id)
    }

    function onActiveHandler(user:User){

        if (checkUserSelected(user)){
            setSelectedUsers(prev=>[...prev!.filter((u)=>u.id !== user.id)]);
        }else{
            setSelectedUsers(prev=>[...prev!, user]);
        }
        // function unselectUser(){
        //     setSelectedUser(prev=>[...prev!.filter((u)=>u.id !== user.id)]);
        // }
        //
        // function selectUser(){
        //     setSelectedUser(prev=>[...prev!, user]);
        // }
        //
        // if (isSelected){
        //     unselectUser()
        // }
        // else{
        //     selectUser()
        // }
    }

    return (<>
        <div className={classes.search}>
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
            </svg>
            <input value={filter} onChange={(e)=>setFilter(e.target.value)} type="text" placeholder="Найти пользователя..."/>
        </div>
        {isLoading ? (
            <div className={classes.skeleton__list}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        ) : (
            <ul className={classes.users__list}>
                {filteredUsers.map((user)=><li key={user.id}><User isSelected={checkUserSelected(user)} onActive={onActiveHandler} user={user}/></li>)}
            </ul>
        )}
        <button onClick={()=>onSend(selectedUsers)} className={classes.send__invite__btn}>Отправить приглашение</button>
    </>)
}

const SuccessView: FC<{onBack: ()=>void}> = ({onBack}) => {
    return (
        <div className={` ${classes.success__block}`}>
            <img src="/assets/success.svg" alt="Success"/>
            <h2>Успешно!</h2>
            <p>Всем пользователям отправлено приглашение.</p>
            <button onClick={onBack} className={classes.send__invite__btn}>Назад</button>
        </div>
    )
}

const UserList: FC = () => {
    async function loadUsers(){
        fetch('https://reqres.in/api/users')
            .then(response => response.json())
            .then(json => json.data.map((user:any)=>(
                {
                    id:user.id,
                    name:`${user.first_name} ${user.last_name}`,
                    email: user.email,
                    avatar: user.avatar,
                } as User)))
            .then(users => setUsers(users))
            .catch(err=>alert("Ошибка загрузки данных"));
    }

    const [users, setUsers] = useState<User[]>([])

    const [isLoading, setIsLoading] = useState(false);

    const [userView, setUserView] = useState(true);


    useEffect(()=>{
        const fetchData = async ()=>{
            setIsLoading(true)
            await loadUsers()
            setIsLoading(false)
        }

        fetchData();
    },[])

    function onSendHandler(selectedUsers:User[]){
        setUserView(false)
    }

    function onBackHandler(){
        setUserView(true)
    }


    return (
        <div className={classes.form}>
            { userView ?
            <UsersView onSend={onSendHandler} users={users} isLoading={isLoading}/> :
            <SuccessView onBack={onBackHandler}/>
            }
        </div>
    )
}

type User = {
    id:number,
    name:string,
    email:string,
    avatar:string
}

const UserListExample: FC = () => {



    return (
        <div className={classes.container}>
            <UserList/>
        </div>
    )
}

export default UserListExample;
import { useEffect } from "react";
import { useUserContext } from "../context/userContext";

function Home() {

    const { users } = useUserContext();

    useEffect(() => {
        console.log(users)
    }, [])

    /* 
        A function triggered by the "Search User" input change 
        that will filter users by the typed input
    */
    const filterUserBySearch = (e: React.FormEvent<HTMLInputElement>): void => {
        console.log(e.currentTarget.value);
    }

    return (
        <div>
            <h1 className='text-2xl p-4 text-center text-white bg-blue-800'>CSR Portal</h1>

            <div className='flex justify-center pl-4 mt-2 mb-2 pr-4 w-full'>
                <input className='pl-1' type='text' placeholder='Search User' onChange={filterUserBySearch}/>
            </div>

            <div className='flex flex-col pl-4 pr-4 gap-1'>
                {users.map(user => {
                    return (
                        <p key={user.id}>{user.firstName} {user.lastName}</p>
                    )
                })}
            </div>
        </div>
    )
}
export default Home;
import { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { User } from "../types/userTypes";
import { useNavigate } from "react-router-dom";

function Home() {

    const { users } = useUserContext();

    const navigate = useNavigate();

    const [displayedUsers, setDisplayedUsers] = useState<User[]>(users);

    useEffect(() => {
        console.log(users)
    }, [])

    /* 
        A function triggered by the "Search User" input change 
        that will filter users by the typed input
    */
    const filterUserBySearch = (e: React.FormEvent<HTMLInputElement>): void => {

        // Non-empty input
        if (e.currentTarget.value.length > 0) {

            const filteredUsers = users.filter(user => `${user.firstName} ${user.lastName}`.toLowerCase().includes(e.currentTarget.value.toLowerCase()) 
                || user.email.toLowerCase().includes(e.currentTarget.value.toLowerCase())
            );

            setDisplayedUsers(filteredUsers);
        }

        // Empty input
        else setDisplayedUsers(users);

    }

    return (
        <div>
            <h1 className='text-2xl p-4 text-center text-white bg-blue-800'>CSR Portal</h1>

            <div className='flex justify-center pl-4 mt-2 mb-2 pr-4'>
                <input className='pl-1 w-full' type='text' placeholder='Search by name or email' onChange={filterUserBySearch}/>
            </div>

            <div className='flex flex-col pl-4 pr-4 gap-1'>
                {displayedUsers.map(user => {
                    return (
                        <a key={user.id} onClick={() => navigate(`users/${user.id}`)}
                        className="border pl-2 pr-2 cursor-pointer hover:bg-slate-100 hover:border-black"
                        >
                            {user.firstName} {user.lastName}
                        </a>
                    )
                })}
            </div>
        </div>
    )
}
export default Home;
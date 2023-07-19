import { ReactNode, createContext, useContext, useState } from "react";
import { User } from "../types/userTypes";
import { fetchUserData } from "../utils/helperFunctions";

type UserContextProviderProps = {
    children: ReactNode
}

type UserContext = {
    users: User[],
    userPutRequest: (body: User) => void,
}

const userContext = createContext({} as UserContext);

export function useUserContext() {
    return useContext(userContext);
}

export function UserContextProvider( { children }: UserContextProviderProps ) {

    const [users, setUsers] = useState<User[]>(() => fetchUserData());

    /*
        A fake PUT request that will update user information by id.
    */
    const userPutRequest = (body: User) => {
        
        const updatedUsersArray = users.map(user => {
            if (user.id === body.id) return body;
            return user
        });

        setUsers(updatedUsersArray);

        localStorage.setItem('users', JSON.stringify(updatedUsersArray));

    }

    return (
        <userContext.Provider value={{users, userPutRequest}}>
            {children}
        </userContext.Provider>
    )

}
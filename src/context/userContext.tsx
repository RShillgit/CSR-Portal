import { ReactNode, createContext, useContext, useState } from "react";
import { User } from "../types/userTypes";
import { fetchUserData } from "../utils/helperFunctions";

type UserContextProviderProps = {
    children: ReactNode
}

type UserContext = {
    users: User[]
}

const userContext = createContext({} as UserContext);

export function useUserContext() {
    return useContext(userContext);
}

export function UserContextProvider( { children }: UserContextProviderProps ) {

    const [users, setUsers] = useState<User[]>(() => fetchUserData());

    return (
        <userContext.Provider value={{users}}>
            {children}
        </userContext.Provider>
    )

}
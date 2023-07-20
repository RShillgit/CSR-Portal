import { ReactNode, createContext, useContext, useState } from "react";
import { Purchase, Subscription, User } from "../types/userTypes";
import { fetchUserData } from "../utils/helperFunctions";

type UserContextProviderProps = {
    children: ReactNode
}

type UserContext = {
    users: User[],
    userPutRequest: (body: User) => void,
    membershipPostRequest: (body: Subscription, userId: string) => void,
    membershipDeleteRequest: (body: Subscription, userId: string) => void,
    purchasePutRequest: (body: Purchase) => void,
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

    /*
        A fake POST request that will add a new membership.
    */
    const membershipPostRequest = (body: Subscription, userId: string) => {
 
        const updatedUsersArray = users.map(user => {
            if (user.id === Number(userId)) {
                user.subscriptions.push(body);
                return user;
            }
            return user;
        })

        setUsers(updatedUsersArray);

        localStorage.setItem('users', JSON.stringify(updatedUsersArray));
    }

    /*
        A fake DELETE request that will delete an existing membership.
    */
    const membershipDeleteRequest = (body: Subscription, userId: string) => {
        
        const updatedUsersArray = users.map(user => {
            if (user.id === Number(userId)) {
                
                const updatedMembershipArray = user.subscriptions.filter(subscription => subscription.id !== body.id);

                user.subscriptions = updatedMembershipArray;

                return user;
            }
            return user;
        })

        setUsers(updatedUsersArray);

        localStorage.setItem('users', JSON.stringify(updatedUsersArray));
    }

    /*
        A fake PUT request that will update purchase information by id.
    */
    const purchasePutRequest = (body: Purchase) => {
        console.log(body)
    }

    return (
        <userContext.Provider value={{users, userPutRequest, membershipPostRequest, membershipDeleteRequest, purchasePutRequest}}>
            {children}
        </userContext.Provider>
    )

}
import userJSON from '../data/users.json';
import { User } from '../types/userTypes';

/*
    A function that resembles fetching a database for user information.
    In this case we resemble a get request to all the users in our database.
*/
export function fetchUserData(): User[] {

    const users = JSON.stringify(userJSON.users);

    // Check local storage for user data
    const localUserData = localStorage.getItem('users');

    // Stored user data
    if (localUserData) {
        return JSON.parse(localUserData) as User[];
    }

    // No stored user data
    else {
        const usersObject = JSON.parse(users) as User[];

        localStorage.setItem('users', JSON.stringify(usersObject));

        return usersObject;
    }
}
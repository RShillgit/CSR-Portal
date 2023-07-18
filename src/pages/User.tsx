import { useParams } from "react-router-dom";
import { useUserContext } from "../context/userContext";

function User() {

    const { userId } = useParams();

    const { users } = useUserContext();

    const selectedUser = users.find(user => user.id === Number(userId))

    console.log(selectedUser)

    return (
        <>
        {selectedUser
            ?
            // If the user exists render the proper information
            <div>
                <h1>User {userId}</h1>
            </div>

            :
            // Else render error
            <div>
                <h1>User {userId} Not Found</h1>
                <a className="border" href="/">Return Home</a>
            </div>
        }
        </>
    )

}
export default User;
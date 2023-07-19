import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useEffect, useState } from "react";

function User() {

    const { userId } = useParams();

    const { users } = useUserContext();

    const navigate = useNavigate();

    const selectedUser = users.find(user => user.id === Number(userId));

    // State variables for tab selection and rendering correct information
    const [accountInformationSelected, setAccountInformationSelected] = useState(false);
    const [membershipSelected, setMembershipSelected] = useState(false);
    const [purchaseHistorySelected, setPurchaseHistorySelected] = useState(false);

    // State that displays correct information based on the selected tab
    const [tabSelectionDisplay, setTabSelectionDisplay] = useState<JSX.Element>();

    console.log(selectedUser)

    // Handles changes of the tab selection to display proper information
    useEffect(() => {

        // Account Information Tab
        if (accountInformationSelected) {
            setTabSelectionDisplay(() => {
                return (
                    <div className="flex flex-col pl-4 pr-4 gap-2 mt-4">

                        <div className="flex justify-between items-center">
                            <h2 className="text-xl">Account Information</h2>
                            <button className="border rounded-lg p-2">Edit</button>
                        </div>
    
                        <p>First Name: {selectedUser?.firstName}</p>
                        <p>Last Name: {selectedUser?.lastName}</p>
                        <p>Email: {selectedUser?.email}</p>
                        <p>Phone Number: {selectedUser?.phoneNumber}</p>
                    
                    </div>
                )
            })
        }
        
        // Membership Tab
        else if (membershipSelected) {
            setTabSelectionDisplay(() => {
                return (
                    <div className="flex flex-col pl-4 pr-4 gap-2 mt-4">

                        <div className="flex justify-between items-center">
                            <h2 className="text-xl">Memberships</h2>
                            <button className="border rounded-lg p-2">Edit</button>
                        </div>
    
                        <ol className="flex flex-col list-decimal pl-4 pr-4">
                            {selectedUser?.subscriptions && selectedUser?.subscriptions.length > 0
                                ?
                                <>
                                    {selectedUser?.subscriptions.map(subscription => {
                                        return (
                                            <div key={subscription.id}>
                                                <li>{subscription.type} ${subscription.cost}/mo</li>
                                            </div>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    <div>
                                        <p>No Subscriptions</p>
                                    </div>
                                </>
                            }

                        </ol>
                    </div>
                )
            })
        }

        // Purchase History Tab
        else if (purchaseHistorySelected) {
            setTabSelectionDisplay(() => {
                return (
                    <div className="flex flex-col pl-4 pr-4 gap-2 mt-4">

                        <div className="flex justify-between items-center">
                            <h2 className="text-xl">Purchases</h2>
                            <button className="border rounded-lg p-2">Edit</button>
                        </div>

                        <ol className="flex flex-col list-decimal pl-4 pr-4">
                            {selectedUser?.purchases && selectedUser?.purchases.length > 0
                                ?
                                <>
                                    {selectedUser?.purchases.map(purchase => {
                                        return (
                                            <div key={purchase.id} className="flex flex-col w-max">
                                                <li>${purchase.cost} - {purchase.type}</li>
                                                <span className="flex justify-end text-sm text-gray-600">
                                                    {purchase.date}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    <div>
                                        <p>No Purchases</p>
                                    </div>
                                </>
                            }

                        </ol>
                    </div>
                )
            })
        }

        // No Tab Selected
        else {

            // Tailwind classes for the CSR's options
            const optionClassAttributes = "border shadow-sm cursor-pointer hover:bg-slate-100";

            setTabSelectionDisplay(() => {
                return (
                    <div className="flex flex-col">
                        <div className={`${optionClassAttributes}`}>
                            <p className="p-2" onClick={() => setAccountInformationSelected(true)}>Manage Account Information</p>
                        </div>
                        <div className={`${optionClassAttributes}`}>
                            <p className="p-2" onClick={() => setMembershipSelected(true)}>Manage Membership</p>
                        </div>
                        <div className={`${optionClassAttributes}`}>
                            <p className="p-2" onClick={() => setPurchaseHistorySelected(true)}>Manage Purchase History</p>
                        </div>
                    </div>
                )
            })
        }

    }, [accountInformationSelected, membershipSelected, purchaseHistorySelected])


    /*
        Called when the user clicks the back button.
        If a tab is selected, then the tab will be unselected.
        If no tab is selected, then navigate back to home.
    */
    const triggerBackButton = () => {

        if(accountInformationSelected || membershipSelected || purchaseHistorySelected) {
            setAccountInformationSelected(false);
            setMembershipSelected(false);
            setPurchaseHistorySelected(false);
        }

        else navigate("/");
    }


    return (
        <>
        {selectedUser
            ?
            // If the user exists render the proper information
            <>
                <div className="flex justify-between items-center text-white bg-blue-800 pl-4 pr-4">
                    <a className="cursor-pointer text-2xl" onClick={triggerBackButton}>{"<"}</a>
                    <h1 className='text-lg p-4 text-center'>User Settings</h1>
                    <a className="cursor-pointer text-2xl" onClick={() => navigate("/")}>x</a>
                </div>

                <div className="p-4 border">
                    <p>{selectedUser.firstName} {selectedUser.lastName}</p>
                    <p>{selectedUser.email}</p>
                </div>

                {tabSelectionDisplay}

            </>
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
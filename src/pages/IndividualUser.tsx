import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import React, { useEffect, useState } from "react";
import { Purchase, Subscription, User } from "../types/userTypes";

function IndividualUser() {

    const { userId } = useParams();

    const { users, userPutRequest } = useUserContext();

    const navigate = useNavigate();

    const selectedUser = users.find(user => user.id === Number(userId));

    // State variables for tab selection and rendering correct information
    const [accountInformationSelected, setAccountInformationSelected] = useState(false);
    const [membershipSelected, setMembershipSelected] = useState(false);
    const [purchaseHistorySelected, setPurchaseHistorySelected] = useState(false);

    // State varaibles for editing selected tab information
    const [editingAccountInformation, setEditingAccountInformation] = useState(false);
    const [editingMembership, setEditingMembership] = useState(false);
    const [editingPurchaseHistory, setEditingPurchaseHistory] = useState(false);

    // State variables for the edit field information
    const [editedAccountInputs, setEditedAccountInputs] = useState<User | undefined>(selectedUser);
    const [editedMembershipInputs, SetEditedMembershipInputs] = useState<Subscription>();
    const [editedPurchaseInputs, setEditedPurchaseInputs] = useState<Purchase>();

    // State that displays correct information based on the selected tab
    const [tabSelectionDisplay, setTabSelectionDisplay] = useState<JSX.Element>();

    // Handles changes of the tab selection to display proper information
    useEffect(() => {

        // Account Information Tab
        if (accountInformationSelected) {

            // Edit account information tab
            if(editingAccountInformation) {
                setTabSelectionDisplay(() => {
                    return (
                        <div className="flex flex-col pl-4 pr-4 gap-2 mt-4">
    
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl">Editing Account Information</h2>
                                <button onClick={cancelEditInformation} className="border rounded-lg p-2">Cancel</button>
                            </div>

                            <form className="flex flex-col gap-2" onSubmit={(e) => editingAccountInformationFormSubmit(e)}>
                                <label className="flex justify-between lg:justify-start gap-2">
                                    First Name:
                                    <input type="text" value={editedAccountInputs?.firstName}
                                        className="border pl-1"
                                        onChange={(e) => {
                                            if (editedAccountInputs) {
                                                const newAccountInfo: User = {...editedAccountInputs};
                                                newAccountInfo.firstName = e.currentTarget.value;
                                                setEditedAccountInputs(newAccountInfo);
                                            }
                                        }}
                                    />
                                </label>
                                <label className="flex justify-between lg:justify-start gap-2">
                                    Last Name:
                                    <input type="text" value={editedAccountInputs?.lastName}
                                        className="border pl-1"
                                        onChange={(e) => {
                                            if (editedAccountInputs) {
                                                const newAccountInfo: User = {...editedAccountInputs};
                                                newAccountInfo.lastName = e.currentTarget.value;
                                                setEditedAccountInputs(newAccountInfo);
                                            }
                                        }}
                                    />
                                </label>
                                <label className="flex justify-between lg:justify-start gap-2">
                                    Email:
                                    <input type="text" value={editedAccountInputs?.email}
                                        className="border pl-1"
                                        onChange={(e) => {
                                            if (editedAccountInputs) {
                                                const newAccountInfo: User = {...editedAccountInputs};
                                                newAccountInfo.email = e.currentTarget.value;
                                                setEditedAccountInputs(newAccountInfo);
                                            }
                                        }}
                                    />
                                </label>
                                <label className="flex justify-between lg:justify-start gap-2">
                                    Phone Number:
                                    <input type="text" value={editedAccountInputs?.phoneNumber}
                                        className="border pl-1"
                                        onChange={(e) => {
                                            if (editedAccountInputs) {
                                                const newAccountInfo: User = {...editedAccountInputs};
                                                newAccountInfo.phoneNumber = e.currentTarget.value;
                                                setEditedAccountInputs(newAccountInfo);
                                            }
                                        }}
                                    />
                                </label>

                                <button className="flex justify-center border">Edit</button>
                            </form>
                        </div>
                    )
                })
            }

            // Standard account information tab
            else {
                setTabSelectionDisplay(() => {
                    return (
                        <div className="flex flex-col pl-4 pr-4 gap-2 mt-4">
    
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl">Account Information</h2>
                                <button onClick={editInformation} className="border rounded-lg p-2">Edit</button>
                            </div>
        
                            <p>First Name: {selectedUser?.firstName}</p>
                            <p>Last Name: {selectedUser?.lastName}</p>
                            <p>Email: {selectedUser?.email}</p>
                            <p>Phone Number: {selectedUser?.phoneNumber}</p>
                        
                        </div>
                    )
                })
            }

        }
        
        // Membership Tab
        else if (membershipSelected) {

            // Edit membership tab
            if (editingMembership) {
                console.log("edit membership", editingMembership);
            }

            // Standard membership tab
            else {
                setTabSelectionDisplay(() => {
                    return (
                        <div className="flex flex-col pl-4 pr-4 gap-2 mt-4">
    
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl">Memberships</h2>
                                <button onClick={editInformation} className="border rounded-lg p-2">Edit</button>
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

        }

        // Purchase History Tab
        else if (purchaseHistorySelected) {

            // Edit purchase history tab
            if (editingPurchaseHistory) {
                console.log("edit purchase history", editingPurchaseHistory)
            }

            // Standard purchase history tab
            else {
                setTabSelectionDisplay(() => {
                    return (
                        <div className="flex flex-col pl-4 pr-4 gap-2 mt-4">
    
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl">Purchases</h2>
                                <button onClick={editInformation} className="border rounded-lg p-2">Edit</button>
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

    }, [accountInformationSelected, membershipSelected, purchaseHistorySelected, editingAccountInformation, editingMembership, editingPurchaseHistory, editedAccountInputs, editedMembershipInputs, editedPurchaseInputs])


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


    /*
        Called when the user clicks the edit button.
        Depending on the tab that is currently selected, 
        that tabs edit state will be set to true, rendering
        the correct form information.
    */
    const editInformation = () => {
        if (accountInformationSelected) setEditingAccountInformation(true);
        else if (membershipSelected) setEditingMembership(true);
        else if (purchaseHistorySelected) setEditingPurchaseHistory(true);
    }


    /*
        Called when the user clicks the Cancel button.
        Depending on the tab that is currently selected, 
        that tabs edit state will be set to false, rendering
        the standard tab information.
    */
    const cancelEditInformation = () => {
        if (accountInformationSelected) setEditingAccountInformation(false);
        else if (membershipSelected) setEditingMembership(false);
        else if (purchaseHistorySelected) setEditingPurchaseHistory(false);
    }

    
    /*
        Called when submitting the edit account information form.
        Handles the form submit by calling the fake PUT request from the user 
        context which will update the User's local storage and state information.
    */
    const editingAccountInformationFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editedAccountInputs) userPutRequest(editedAccountInputs);
        setEditingAccountInformation(false);
        return;
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
export default IndividualUser;
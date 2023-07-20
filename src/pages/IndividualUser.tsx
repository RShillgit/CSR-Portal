import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import React, { useEffect, useRef, useState } from "react";
import { Purchase, Subscription, User } from "../types/userTypes";
import { v4 as uuid } from 'uuid';

import carImg from '../assets/images/car.png';
import creditCardImg from '../assets/images/credit-card.png';
import dollarImg from '../assets/images/dollar.png';

function IndividualUser() {

    const { userId } = useParams();

    const { users, userPutRequest, membershipPostRequest, membershipDeleteRequest, membershipPutRequest } = useUserContext();

    const navigate = useNavigate();

    const selectedUser = users.find(user => user.id === Number(userId));

    // State variables for tab selection and rendering correct information
    const [accountInformationSelected, setAccountInformationSelected] = useState(false);
    const [membershipSelected, setMembershipSelected] = useState(false);
    const [purchaseHistorySelected, setPurchaseHistorySelected] = useState(false);

    // State varaible for editing account information
    const [editingAccountInformation, setEditingAccountInformation] = useState(false);
    
    // State varaible for adding a membership
    const [addingMembership, setAddingMembership] = useState(false);

    // State variable for the edit account information fields 
    const [editedAccountInputs, setEditedAccountInputs] = useState<User | undefined>(selectedUser);

    // State varaible for the membership to be deleted
    const membershipForDeletion = useRef<Subscription | null>();

    // State varaible for the membership to be transferred
    const membershipForTransfer = useRef<Subscription | null>();

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
                                <h2 className="text-2xl text-blue">Editing Account Information</h2>
                                <button onClick={cancelEditInformation} className="rounded-lg p-2 text-orange hover:border-orange border-2">Cancel</button>
                            </div>

                            <form className="flex flex-col gap-2" onSubmit={(e) => editingAccountInformationFormSubmit(e)}>
                                <label className="flex justify-between md:justify-start lg:justify-start gap-2">
                                    First Name:
                                    <input type="text" value={editedAccountInputs?.firstName} required={true}
                                        className="border pl-1 text-lg"
                                        onChange={(e) => {
                                            if (editedAccountInputs) {
                                                const newAccountInfo: User = {...editedAccountInputs};
                                                newAccountInfo.firstName = e.currentTarget.value;
                                                setEditedAccountInputs(newAccountInfo);
                                            }
                                        }}
                                    />
                                </label>
                                <label className="flex justify-between md:justify-start lg:justify-start gap-2">
                                    Last Name:
                                    <input type="text" value={editedAccountInputs?.lastName} required={true}
                                        className="border pl-1 text-lg"
                                        onChange={(e) => {
                                            if (editedAccountInputs) {
                                                const newAccountInfo: User = {...editedAccountInputs};
                                                newAccountInfo.lastName = e.currentTarget.value;
                                                setEditedAccountInputs(newAccountInfo);
                                            }
                                        }}
                                    />
                                </label>
                                <label className="flex justify-between md:justify-start lg:justify-start gap-2">
                                    Email:
                                    <input type="text" value={editedAccountInputs?.email} required={true}
                                        className="border pl-1 text-lg"
                                        onChange={(e) => {
                                            if (editedAccountInputs) {
                                                const newAccountInfo: User = {...editedAccountInputs};
                                                newAccountInfo.email = e.currentTarget.value;
                                                setEditedAccountInputs(newAccountInfo);
                                            }
                                        }}
                                    />
                                </label>
                                <label className="flex justify-between md:justify-start lg:justify-start gap-2">
                                    <div className="flex flex-col justify-end">
                                        Phone Number:
                                        <span className="text-end text-sm text-gray-600">Ex: 555-555-5555</span>
                                    </div>
                                    <input type="tel" value={editedAccountInputs?.phoneNumber} required={true}
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                        className="border pl-1 text-lg"
                                        onChange={(e) => {
                                            if (editedAccountInputs) {
                                                const newAccountInfo: User = {...editedAccountInputs};
                                                newAccountInfo.phoneNumber = e.currentTarget.value;
                                                setEditedAccountInputs(newAccountInfo);
                                            }
                                        }}
                                    />

                                </label>

                                <button className="flex rounded-lg p-2 justify-center border bg-orange hover:bg-darkOrange text-white">Edit</button>
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
                                <h2 className="text-2xl text-blue">Account Information</h2>
                                <button onClick={editInformation} className="border rounded-lg p-2 bg-orange hover:bg-darkOrange text-white">Edit</button>
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
            if (addingMembership) {
                setTabSelectionDisplay(() => {
                    return (
                        <div className="flex flex-col pl-4 pr-4 gap-2 mt-4">
    
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl text-blue">Adding Memberships</h2>
                                <button onClick={cancelEditInformation} className="rounded-lg p-2 text-orange hover:border-orange border-2">Cancel</button>
                            </div>
        
                            <form className="flex flex-col gap-2" onSubmit={(e) => addingMembershipFormSubmit(e)}>

                                <label className="flex justify-between md:justify-start lg:justify-start gap-2">
                                    Membership Type:
                                    <input className="border pl-1 text-lg" type="text" id="add-membership-type" required={true}/>
                                </label>
                                <label className="flex justify-between md:justify-start lg:justify-start gap-2">
                                    Membership Cost:
                                    <input className="border pl-1 text-lg" type="number" min="0.01" step="0.01" id="add-membership-cost" required={true}/>
                                </label>
                                <label className="flex justify-between md:justify-start lg:justify-start gap-2">
                                    Membership Vehicle:
                                    <input className="border pl-1 text-lg" type="text" id="add-membership-vehicle" required={true}/>
                                </label>

                                <button className="flex rounded-lg p-2 justify-center border bg-orange hover:bg-darkOrange text-white">Add</button>
                            </form>
                        </div>
                    )
                })
            }

            // Standard membership tab
            else {
                setTabSelectionDisplay(() => {
                    return (
                        <div className="flex flex-col pl-4 pr-4 gap-2 mt-4">
    
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl text-blue">Memberships</h2>
                                <button onClick={editInformation} className="border rounded-lg p-2 bg-orange hover:bg-darkOrange text-white">Add</button>
                            </div>
        
                            {selectedUser?.subscriptions && selectedUser?.subscriptions.length > 0
                                ?
                                <>
                                    <ol className="flex flex-col list-decimal pl-4 pr-4 gap-4">
                                        {selectedUser?.subscriptions.map(subscription => {
                                            return (
                                                <div key={subscription.id} className="flex justify-between md:justify-start lg:justify-start gap-4">
                                                    <div className="flex flex-col items-end">
                                                        <li>{subscription.type} ${subscription.cost}/mo</li>
                                                        <span className="text-sm text-gray-500">{subscription.vehicle}</span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <button className="text-orange rounded-lg p-1 hover:border-orange border-2" onClick={() => triggerTransferMembership(subscription)}>Transfer</button>
                                                        <button className="text-orange rounded-lg p-1 hover:border-orange border-2" onClick={() => triggerDeleteMembership(subscription)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </ol>

                                    <dialog id="deleteMembershipConfirmationModal" className="rounded-xl">
                                        <div className="p-4 ">                                     
                                            <h2 className="text-lg">Are you sure you want to delete this membership?</h2>
                                            <div className="flex gap-2 justify-center">

                                                <button className="p-1 w-16 rounded-md text-orange hover:border-orange border-2" onClick={() => {
                                                    const deleteMembershipConfirmationModal = document.getElementById('deleteMembershipConfirmationModal') as HTMLDialogElement;
                                                    deleteMembershipConfirmationModal.close();
                                                    membershipForDeletion.current = null;
                                                }}>No</button>

                                                <button className="border p-1 w-16 rounded-md bg-orange hover:bg-darkOrange text-white" onClick={() => {
                                                    if(membershipForDeletion) confirmDeleteMembership();
                                                }}>Yes</button>

                                            </div>
                                        </div>
                                    </dialog>

                                    <dialog id="transferMembershipConfirmationModal" className="rounded-xl">
                                        <form className="flex flex-col p-4 justify-center gap-2" onSubmit={(e) => confirmTransferMembership(e)}>                                     
                                            <h2 className="text-lg">What vehicle would you like to transfer this membership to?</h2>
                                            <input className="pl-1 border text-lg" type="text" placeholder="Vehicle" id="transfer-membership-vehicle"/>
                                            <div className="flex gap-2 justify-center">

                                                <button className="p-1 w-18 rounded-md text-orange hover:border-orange border-2" type="button" onClick={() => {
                                                    const transferMembershipConfirmationModal = document.getElementById('transferMembershipConfirmationModal') as HTMLDialogElement;
                                                    const transferVehicleInput = document.getElementById('transfer-membership-vehicle') as HTMLInputElement;
                                                    transferMembershipConfirmationModal.close();
                                                    membershipForTransfer.current = null;
                                                    transferVehicleInput.value = "";
                                                }}>Cancel</button>

                                                <button className="border p-1 w-18 rounded-md bg-orange hover:bg-darkOrange text-white" type="submit" onClick={() => {
                                                    if(membershipForDeletion) confirmDeleteMembership();
                                                }}>Transfer</button>

                                            </div>
                                        </form>
                                    </dialog>
                                </>
                                :
                                <>
                                    <div>
                                        <p>No Subscriptions</p>
                                    </div>
                                </>
                            }
    
                        </div>
                    )
                })
            }

        }

        // Purchase History Tab
        else if (purchaseHistorySelected) {
            setTabSelectionDisplay(() => {
                return (
                    <div className="flex flex-col pl-4 pr-4 gap-2 mt-4">

                        <div className="flex items-center">
                            <h2 className="text-2xl text-blue">Purchase History</h2>
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
            const optionClassAttributes = "border shadow-sm cursor-pointer hover:bg-slate-100 flex pl-4 pr-4 p-2";

            setTabSelectionDisplay(() => {
                return (
                    <div className="flex flex-col min-w-max">
                        <div className={`${optionClassAttributes}`}>
                            <img src={carImg} className="blueIcon block w-8" alt=""/>
                            <p className="p-2 text-blue" onClick={() => setAccountInformationSelected(true)}>Manage Account Information</p>
                        </div>
                        <div className={`${optionClassAttributes}`}>
                            <img src={creditCardImg} className="blueIcon w-8" alt=""/>
                            <p className="p-2 text-blue" onClick={() => setMembershipSelected(true)}>Manage Memberships</p>
                        </div>
                        <div className={`${optionClassAttributes}`}>
                            <img src={dollarImg} className="blueIcon w-8" alt=""/>
                            <p className="p-2 text-blue" onClick={() => setPurchaseHistorySelected(true)}>View Purchase History</p>
                        </div>
                    </div>
                )
            })
        }

    }, [users, accountInformationSelected, membershipSelected, purchaseHistorySelected, editingAccountInformation, addingMembership, editedAccountInputs])


    /*
        Called when the user clicks the back button.
        If a tab is selected, then the tab will be unselected.
        If no tab is selected, then navigate back to home.
    */
    const triggerBackButton = () => {

        if (editingAccountInformation || addingMembership) {
            setEditingAccountInformation(false);
            setAddingMembership(false);
            setEditedAccountInputs(selectedUser);
        }

        else if(accountInformationSelected || membershipSelected || purchaseHistorySelected) {
            setAccountInformationSelected(false);
            setMembershipSelected(false);
            setPurchaseHistorySelected(false);
        }

        else navigate("/");
    }


    /*
        Called when the user clicks the edit or add button.
        Depending on the tab that is currently selected, 
        that tabs edit or add state will be set to true, 
        rendering the correct form information.
    */
    const editInformation = () => {
        if (accountInformationSelected) setEditingAccountInformation(true);
        else if (membershipSelected) setAddingMembership(true);
    }


    /*
        Called when the user clicks the Cancel button.
        Depending on the tab that is currently selected, 
        that tabs edit state will be set to false, rendering
        the standard tab information.
    */
    const cancelEditInformation = () => {
        if (accountInformationSelected) {
            setEditingAccountInformation(false);
            setEditedAccountInputs(selectedUser);
        }
        else if (membershipSelected) setAddingMembership(false);
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


    /*
        Called when submitting the edit membership form.
        Handles the form submit by calling the fake PUT request from the user 
        context which will update the User's local storage and state information.
    */
    const addingMembershipFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newMembershipType = document.getElementById("add-membership-type") as HTMLInputElement;
        const newMembershipCost = document.getElementById("add-membership-cost") as HTMLInputElement;
        const newMembershipVehicle = document.getElementById("add-membership-vehicle") as HTMLInputElement;

        if (newMembershipType && newMembershipCost && userId) {

            const randomId: string = uuid();

            const newMembership: Subscription = {
                id: randomId,
                type: newMembershipType.value,
                cost: Number(newMembershipCost.value),
                vehicle: newMembershipVehicle.value,
            }

            membershipPostRequest(newMembership, userId);
        }
        setAddingMembership(false);
        return;
    }


    /* 
        Called when clicking the transfer button next to an existing membership.
        This will bring up a modal that will require the user to enter the vehicle
        they would like to transfer the membership to.

    */
    const triggerTransferMembership = (subscription: Subscription) => {
        membershipForTransfer.current = subscription;
        const transferMembershipConfirmationModal = document.getElementById('transferMembershipConfirmationModal') as HTMLDialogElement;
        transferMembershipConfirmationModal.showModal();
    }


    /* 
        Called when transferring a membership to a new vehicle.

    */
    const confirmTransferMembership = (e: React.FormEvent) => {
        e.preventDefault();
        const transferVehicleInput = document.getElementById('transfer-membership-vehicle') as HTMLInputElement;
        if (userId && membershipForTransfer.current && transferVehicleInput) {
            const transferMembershipConfirmationModal = document.getElementById('transferMembershipConfirmationModal') as HTMLDialogElement;
            membershipPutRequest(membershipForTransfer.current, userId, transferVehicleInput.value);
            transferMembershipConfirmationModal.close();
            membershipForTransfer.current = null;
            transferVehicleInput.value = "";
        }
    }


    /* 
        Called when clicking the delete button next to an existing membership.
        This will bring up a modal that will require the user to confirm the deletion,
        that way they dont accidentally delete a membership

    */
    const triggerDeleteMembership = (subscription: Subscription) => {
        membershipForDeletion.current = subscription;
        const deleteMembershipConfirmationModal = document.getElementById('deleteMembershipConfirmationModal') as HTMLDialogElement;
        deleteMembershipConfirmationModal.showModal();
    }


    /* 
        Called when confirming the deletion of an existing membership.

    */
    const confirmDeleteMembership = () => {
        if (userId && membershipForDeletion.current) {
            const deleteMembershipConfirmationModal = document.getElementById('deleteMembershipConfirmationModal') as HTMLDialogElement;
            membershipDeleteRequest(membershipForDeletion.current, userId);
            deleteMembershipConfirmationModal.close();
            membershipForDeletion.current = null;
        }
    }

    return (
        <>
        {selectedUser
            ?
            // If the user exists render the proper information
            <>
                <div className="flex justify-between items-center text-white bg-blue pl-4 pr-4 min-w-max">
                    <a className="cursor-pointer text-2xl" onClick={triggerBackButton}>{"<"}</a>
                    <h1 className='text-lg p-4 text-center'>User Settings</h1>
                    <a className="cursor-pointer text-2xl" onClick={() => navigate("/")}>x</a>
                </div>

                <div className="flex items-center border p-4 min-w-max">
                    <div className="flex shrink-0 items-center justify-center w-14 h-14 rounded-full bg-blue text-white text-2xl">
                        {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                    </div>
                    <div className="pl-4">
                        <p className="text-2xl">{selectedUser.firstName} {selectedUser.lastName}</p>
                        <p>{selectedUser.email}</p>
                    </div>
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
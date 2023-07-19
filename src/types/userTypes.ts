export type User = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    subscriptions: Subscription[],
    purchases: Purchase[]
}

export type Subscription = {
    id: string,
    type: string,
    cost: number
}

export type Purchase = {
    id: string,
    type: string,
    cost: number,
    date: string
}
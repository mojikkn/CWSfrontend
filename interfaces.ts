interface Reservations {
    count: number,
    data: Reservation[]
}

interface Reservation {
    _id: string,
    rsvtDate: string,
    user: string,
    coworkingspace: CoworkingspacesItem
}

interface ReservationItem {
    userName : string
    cwsID : string
    rsvtDate : string
}

interface Coworkingspaces {
    count: number,
    data: CoworkingspacesItem[]
}

interface CoworkingspacesItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    tel: string,
    openTime: string,
    closeTime: string,
    picture: string
}

interface User {
    name: string,
    tel: string,
    email: string,
    role: string,
    password: string
}

interface UserSession {
    _id: string,
    name: string,
    tel: string,
    email: string,
    role: string,
    createAt: string,
    token: string
}
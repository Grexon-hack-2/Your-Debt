export interface AuthorizationResponse {
    token: string,
    authorized: boolean,
    msg: string
}

export interface UserData {
    UserAdminID: string
    NameUser: string
    Email: string
    PersonName: string
    Image: string
}

export interface Ijwt {
    nameid: string
    account: string
    iat: number
    exp: number
}

export interface RegisterData {
    user: string
    name: string
    password: string
    email: string
    image: string
}
export interface deudaModel {
    _id: string,
    idCliente: string,
    idProduct: string,
    quantity: number,
    totalAccount:number,
    dateOfPurchase: Date
}

export interface abono {
    _id:string,
    idCliente:string,
    pay:number
}
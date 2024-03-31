export interface deudaModel {
    debtsID?: string,
    debtorsID: string,
    productID: string,
    quantity: number,
    totalAccount:number,
    dateOfPurchase: Date
}

export interface abono {
    abonoID:string,
    debtorsID:string,
    amountPaid:number
}
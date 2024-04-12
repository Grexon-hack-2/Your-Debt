export interface listDebt {
    debtorsID: string,
    name: string,
    phone: string,
    debt: number,
    audit_CreatedOnDate: Date,
    detail: string
}

export interface OtherDebtsRequest {
    debtorsID: string
    debtorName: string
    debt: number
    nameDebt: string
}

export interface OtherDebtsResponse extends OtherDebtsRequest
{
    otherDebtsID: string
    audit_CreatedOnDate: Date
}
export interface History_OtherDebt {
    h_OtherDebtID: string;
    userAdminID: string;
    debtorName: string;
    debt: number;
    nameDebt: string;
    audit_CreatedOnDate: Date;
    debtorsID: string;
    status: string;
}

export interface History_Abono {
    h_AbonoID: string;
    userAdminID: string;
    debtorsID: string;
    amountPaid: number;
    nameDebtor: string;
    audit_CreatedOnDate: Date;
}

export interface History_Product {
    h_ProductID: string;
    userAdminID: string;
    name: string;
    unitPrice: number;
    moneyInvested: number;
    audit_CreatedOnDate: Date;
}

import { abono } from './../../Models/deudaModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { deudaModel } from 'src/Models/deudaModel';
import { OtherDebtsRequest, OtherDebtsResponse, listDebt } from 'src/Models/listDebtsModel';
import { Product } from 'src/Models/productModel';
import { Your_debts_httpService } from '../Services/your_debts_http.service';
import { DataByMonth, History_Abono, History_OtherDebt, History_Product } from 'src/Models/historiesInterfaces';

@Injectable({
  providedIn: 'root'
})
export class InitialService {
  constructor(private httpService$: Your_debts_httpService){}

  // deudores ------------------------------
  getAllDebts():Observable<listDebt[]> {
    const url = "api/Debtors/GetAllDebts";
    return this.httpService$.getWithHeaders(url);
  }

  addNewClient(debt: listDebt ):Observable<string> {
    let url = "api/Debtors/InsertClient";
    return this.httpService$.post<string>(url, debt)
  }

  getDetailDebt(id: string): Observable<listaDetallada> {
    let url = "api/Debtors/GetDataFullDebt";
    return this.httpService$.getByParams<listaDetallada>(url, {idClient: id});
  }

  deleteClient(id: string): Observable<string> {
    let url = "api/Debtors/DeleteClient";
    return this.httpService$.delete<string>(url, {idClient: id});
  }

  // productos -----------------------------------

  getAllProducts():Observable<Product[]> {
    const url = "api/Product/GetAllProducts";
    return this.httpService$.getWithHeaders<Product[]>(url);
  }

  addOneProduct(product: Product):Observable<string>{
    const url = "api/Product/InsertProduct";
    return this.httpService$.post<string>(url,product);
  }

  deleteProduct(id: string): Observable<string>{
    const url = "api/Product/DeleteProduct";
    return this.httpService$.delete<string>(url, {idProduct: id})
  }

  // Debts ---------------------------

  addOneDebtTable(debt: deudaModel): Observable<string> {
    const url = "api/Debts/InsertingDebt";
    return this.httpService$.post<string>(url, debt);
  }

  getDataOtherDebtById(id: string): Observable<OtherDebtsResponse>{
    const url = "api/Debts/GetOtherDebtById";
    return this.httpService$.getByParams<OtherDebtsResponse>(url, {debtorID: id});
  }

  getAllOtherDebts():Observable<OtherDebtsResponse[]>{
    const url = "api/Debts/GetAllOtherDebts";
    return this.httpService$.getWithHeaders<OtherDebtsResponse[]>(url);
  }

  insertNewDebt(data: OtherDebtsRequest):Observable<string>{
    const url = "api/Debts/InsertingOtherDebt";
    return this.httpService$.post<string>(url, data);
  }

  // payment ---------------------------

  addAbonoClient(_pay: abono):Observable<string> {
    const url = "api/Debts/AddAbonoToUser";
    return this.httpService$.post<string>(url, _pay);
  }

  // histories ----------------------------------

  getHistoryOtherDebts():Observable<History_OtherDebt[]>{
    const url = "api/History/GetHistoryOtherDebts";
    return this.httpService$.getWithHeaders(url);
  }

  getHistoryAbono():Observable<DataByMonth<History_Abono>>{
    const url = "api/History/GetHistoryAbono";
    return this.httpService$.getWithHeaders(url);
  }

  getHistoryProducts():Observable<DataByMonth<History_Product>>{
    const url = "api/History/GetHistoryProducts";
    return this.httpService$.getWithHeaders(url);
  }
  
}

export interface listaDetallada extends listDebt {
  listaDeudas: deudaModel[],
  amountPaid: number
}
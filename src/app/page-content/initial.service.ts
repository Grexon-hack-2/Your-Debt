import { abono } from './../../Models/deudaModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { deudaModel } from 'src/Models/deudaModel';
import { listDebt } from 'src/Models/listDebtsModel';
import { Product } from 'src/Models/productModel';
import { datos_de_prueba } from 'src/Utils/dataTest';
import { Your_debts_httpService } from '../Services/your_debts_http.service';

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

  // payment ---------------------------

  addAbonoClient(_pay: abono):string {
    try {
      datos_de_prueba.listDebts.forEach((item) => {
        if(item.debtorsID === _pay.debtorsID) {
          item.debt -= _pay.amountPaid;
          item.debt = item.debt < 0 ? 0 : item.debt;
          datos_de_prueba.abono.push(_pay)
          if(item.debt <= 0){
            datos_de_prueba.deuda = datos_de_prueba.deuda.filter(debt => debt.debtorsID != _pay.debtorsID );
            datos_de_prueba.abono = datos_de_prueba.abono.filter(abono => abono.debtorsID != _pay.debtorsID);
          }
        }
      })

      return "El abono a sido ingresado exitosamente";

    } catch (error) {
      return "Ha ocurrido un error"
    }
  }
  
}

// function getDataFullDebt(id: string): listaDetallada {
//     let DataDebtClient: listDebt = datos_de_prueba.listDebts.find((item) => item.debtorsID === id)

//     let dataResult: listaDetallada = {
//       debtorsID: DataDebtClient.debtorsID,
//       name : DataDebtClient.name,
//       phone: DataDebtClient.phone,
//       debt: DataDebtClient.debt,
//       audit_CreatedOnDate: DataDebtClient.audit_CreatedOnDate,
//       detail: DataDebtClient.detail,
//       DebtList: []
//     }

//     datos_de_prueba.deuda.forEach((item) => {
//       if(item.idCliente === id){
//         dataResult.DebtList.push(item)
//       }
//     })
    
//     return dataResult;
// }
export interface listaDetallada extends listDebt {
  listaDeudas: deudaModel[],
  amountPaid: number
}
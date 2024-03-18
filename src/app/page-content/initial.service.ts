import { Injectable } from '@angular/core';
import { deudaModel } from 'src/Models/deudaModel';
import { listDebt } from 'src/Models/listDebtsModel';
import { Product } from 'src/Models/productModel';
import { datos_de_prueba } from 'src/Utils/dataTest';

@Injectable({
  providedIn: 'root'
})
export class InitialService {

  // deudores ------------------------------
  getAllDebts(): listDebt[] {
    return datos_de_prueba.listDebts
  }

  addNewClient(debt: listDebt ):void {
    datos_de_prueba.listDebts.push(debt)
  }

  getDetailDebt(id: string): listaDetallada {
    return getDataFullDebt(id);
  }

  addOneDebtMore(id: string, count: number): void {
    datos_de_prueba.listDebts.forEach((item) => {
      if(item._id === id) item.Debt += count;
    })
  }

  // productos -----------------------------------

  getAllProducts(): Product[] {
    return datos_de_prueba.productListTest;
  }

  addOneProduct(product: Product):void{
    datos_de_prueba.productListTest.push(product)
  }

  // Debts ---------------------------

  addOneDebtTable(debt: deudaModel): void {
    datos_de_prueba.deuda.push(debt);
  }
  
}

function getDataFullDebt(id: string): listaDetallada {
    let DataDebtClient: listDebt = datos_de_prueba.listDebts.find((item) => item._id === id)

    let dataResult: listaDetallada = {
      _id: DataDebtClient._id,
      Name : DataDebtClient.Name,
      Phone: DataDebtClient.Phone,
      Debt: DataDebtClient.Debt,
      Date: DataDebtClient.Date,
      Detail: DataDebtClient.Detail,
      DebtList: []
    }

    datos_de_prueba.deuda.forEach((item) => {
      if(item.idCliente === id){
        dataResult.DebtList.push(item)
      }
    })
    
    return dataResult;
}
export interface listaDetallada extends listDebt {
  DebtList: deudaModel[]
}
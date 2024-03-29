import { abono } from './../../Models/deudaModel';
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

  deleteClient(id: string):string {
    const indexToDelete = datos_de_prueba.listDebts.findIndex(debt => debt._id === id);

    if(indexToDelete !== -1){
      let elementDelete = datos_de_prueba.listDebts.splice(indexToDelete, 1)[0];

      const deletedDebts = datos_de_prueba.deuda.filter( debt => debt.idCliente !== elementDelete._id);

      datos_de_prueba.deuda = deletedDebts;

      return 'El deudor ha sido eliminado con exito'
    }
    else {
      return 'El deudor no existe en la base de datos'
    }
  }

  // productos -----------------------------------

  getAllProducts(): Product[] {
    return datos_de_prueba.productListTest;
  }

  addOneProduct(product: Product):void{
    datos_de_prueba.productListTest.push(product)
  }

  deleteProduct(id: string){
    datos_de_prueba.productListTest = datos_de_prueba.productListTest.filter(item => item._id != id);
  }

  // Debts ---------------------------

  addOneDebtTable(debt: deudaModel): void {
    datos_de_prueba.productListTest.forEach(item => {
      if(item._id === debt.idProduct) {
        item.QuantityInStock -= debt.quantity;
      }
    })
    datos_de_prueba.deuda.push(debt);
  }

  // payment ---------------------------

  addAbonoClient(_pay: abono):string {
    try {
      datos_de_prueba.listDebts.forEach((item) => {
        if(item._id === _pay.idCliente) {
          item.Debt -= _pay.pay;
          item.Debt = item.Debt < 0 ? 0 : item.Debt;
          datos_de_prueba.abono.push(_pay)
          if(item.Debt <= 0){
            datos_de_prueba.deuda = datos_de_prueba.deuda.filter(debt => debt.idCliente != _pay.idCliente );
            datos_de_prueba.abono = datos_de_prueba.abono.filter(abono => abono.idCliente != _pay.idCliente);
          }
        }
      })

      return "El abono a sido ingresado exitosamente";

    } catch (error) {
      return "Ha ocurrido un error"
    }
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
      DebtList: [],
      Abonos: datos_de_prueba.abono.filter(item => item.idCliente === id).reduce((prev, curr) => prev + curr.pay ,0)
    }

    datos_de_prueba.deuda.forEach((item) => {
      if(item.idCliente === id){
        dataResult.DebtList.push(item)
      }
    })
    
    return dataResult;
}
export interface listaDetallada extends listDebt {
  DebtList: deudaModel[],
  Abonos: number
}
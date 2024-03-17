import { Injectable } from '@angular/core';
import { listDebt } from 'src/Models/listDebtsModel';
import { Product } from 'src/Models/productModel';
import { datos_de_prueba } from 'src/Utils/dataTest';

@Injectable({
  providedIn: 'root'
})
export class InitialService {

  getAllDebts(): listDebt[] {
    return datos_de_prueba.listPrueba
  }

  addNewClient(debt: listDebt ):void {
    datos_de_prueba.listPrueba.push(debt)
  }

  getAllProducts(): Product[] {
    return datos_de_prueba.productListTest;
  }

  addOneProduct(product: Product):void{
    datos_de_prueba.productListTest.push(product)
  }
  
}
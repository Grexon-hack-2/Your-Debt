import { abono, deudaModel } from 'src/Models/deudaModel';
import { listDebt } from 'src/Models/listDebtsModel';
import { Product } from 'src/Models/productModel';

export class datos_de_prueba {
  public static listDebts: listDebt[] = [];

  public static deuda: deudaModel[] = [];

  public static abono: abono[]=[];

  public static productListTest: Product[] = [];
}

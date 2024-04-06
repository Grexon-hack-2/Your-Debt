import { Routes } from "@angular/router";
import { DeudoresPage } from "./deudores.page";
import { DetalleDeudorPage } from "./detalle-deudor/detalle-deudor.page";


export const routes_debts: Routes = [
    {
        path:'',
        component: DeudoresPage
    },
    {
        path: 'detalle/:idClient',
        component: DetalleDeudorPage
    }
]
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'lista-produtos'},

{ path: 'lista-produtos',
 loadChildren: () => import('./lista-produtos/lista-produtos.module').then(m => m.ListaProdutosModule)}

];

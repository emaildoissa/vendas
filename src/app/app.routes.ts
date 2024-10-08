import { Routes } from '@angular/router';
import { ProdutosCpuComponent } from './produtos-cpu/produtos-cpu.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos/lista-produtos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'produtos-cpu', pathMatch: 'full' },  // Redireciona para 'produtos-cpu' quando a rota for vazia
  { path: 'produtos-cpu', component: ProdutosCpuComponent },  // Rota para o ProdutosCpuComponent
  { path: 'lista-produtos', component: ListaProdutosComponent }
];

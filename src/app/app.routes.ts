import { Routes } from '@angular/router';
import { SimulacaoComponent } from './simulacao/simulacao.component';
import { ProdutosCpuComponent } from './produtos-cpu/produtos-cpu.component';

export const routes: Routes = [
  { path: '', redirectTo: 'produtos-cpu', pathMatch: 'full' },  // Redireciona para 'produtos-cpu' quando a rota for vazia
  { path: 'simulacao', component: SimulacaoComponent },  // Rota para o SimulacaoComponent
  { path: 'produtos-cpu', component: ProdutosCpuComponent },  // Rota para o ProdutosCpuComponent
];

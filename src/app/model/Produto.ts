import { FormControl } from '@angular/forms';
export class Produto {
  id: number;
  foto: string;
  nome: string;
  preco: number;
  mostrarParcelamento: boolean;
  parcelamento: boolean;
  toppingsControl?: FormControl;
  precoFinal: number;
  precoParcelado: number;
}

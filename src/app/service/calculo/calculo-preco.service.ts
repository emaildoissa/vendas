import { Injectable } from '@angular/core';
import { Toppings } from '../../enums/toppings.enum';

@Injectable({
  providedIn: 'root'
})
export class CalculoPrecoService {

  constructor() { }


  aplicarPorcentagem(valor: number, porcentagem: number): number {
    const valorComPorcentagem = valor + (valor * (porcentagem / 100));
    return valorComPorcentagem;
  }

  obterValorParcela(valor: number, topping: Toppings): number {
    const ToppingValues: Record<Toppings, number> = {

      [Toppings.parcela1]: 1,
      [Toppings.parcela2]: 2,
      [Toppings.parcela3]: 3,
      [Toppings.parcela4]: 4,
      [Toppings.parcela5]: 5,
      [Toppings.parcela6]: 6,
      [Toppings.parcela7]: 7,
      [Toppings.parcela8]: 8,
      [Toppings.parcela9]: 9,
      [Toppings.parcela10]: 10,
      [Toppings.parcela11]: 11,
      [Toppings.parcela12]: 12
    };

    const numeroParcelas = ToppingValues[topping];
    valor = valor + (valor * (40 / 100));
    const valorParcela = numeroParcelas > 0 ? valor / numeroParcelas : valor;

    return valorParcela;
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Toppings } from '../enums/toppings.enum';
import { Produto } from '../model/Produto';
import { CalculoPrecoService } from '../service/calculo/calculo-preco.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produtos-cpu',
  standalone: true,
  imports: [
    MatCard,
    MatToolbarModule,
    MatCardModule,
    RouterLink,
    CommonModule,
    MatGridListModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './produtos-cpu.component.html',
  styleUrl: './produtos-cpu.component.scss',
})
export class ProdutosCpuComponent implements OnInit, OnDestroy {

 // toppings = new FormControl<Toppings>(Toppings.parcela1);
  toppingList: Toppings[] = Object.values(Toppings);
  vetor: Produto[] = [];
  produtoControls = new Map<number, FormControl>();
  //@Input() vetor: Produto[] = [];
  //@Output() produtoSelecionado = new EventEmitter<Produto>();

  nomePreco: String = 'À vista';

  private unsubscribe$ = new Subject<void>();

  constructor(private service: ProdutoService, private calculoPrecoService: CalculoPrecoService ) {}

  ngOnInit(){
    this.selecionar();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selecionar(): void {
    this.service.selecionar().subscribe(retorno => {
      this.vetor = retorno.map(produto => {
        const produtoFormatado = {
          ...produto,
          precoFinal: this.calculoPrecoService.aplicarPorcentagem(produto.preco, 40)
        };

        // Cria um FormControl para cada produto
        const control = new FormControl();
        this.produtoControls.set(produto.id, control);

        control.valueChanges
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((topping: Toppings) => {
            this.atualizarParcelamento(produtoFormatado, topping);
          });

        return produtoFormatado;
      });
    });
  }

  exibirParcelamento(produto: Produto) {
    produto.mostrarParcelamento = !produto.mostrarParcelamento;

    // Se o parcelamento for exibido, calcula o valor parcelado
   // if (produto.mostrarParcelamento) {
      //const toppingSelecionado = produto.toppingsControl?.value as Toppings;
      //produto.precoParcelado = this.calculoPrecoService.obterValorParcela(produto.preco, toppingSelecionado);
      //console.log(Toppings);
   // }
  }

   atualizarParcelamento(produto: Produto, topping: Toppings) {
    // Atualiza o preço formatado com o valor parcelado
    if (topping !== null && topping !== undefined) {
      produto.precoParcelado = this.calculoPrecoService.obterValorParcela(produto.preco, topping);
      produto.precoFinal = produto.precoParcelado;
      this.nomePreco = 'Parcelas';
      }
    }

  // Método para obter o FormControl de um produto específico
  getFormControl(produtoId: number): FormControl | undefined {
    return this.produtoControls.get(produtoId);
  }

}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

import { Toppings } from '../enums/toppings.enum';
import { Produto } from '../model/Produto';
import { CalculoPrecoService } from '../service/calculo/calculo-preco.service';
import { ProdutoService } from '../service/produto.service';
import { Subject, takeUntil } from 'rxjs';

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
export class ProdutosCpuComponent implements OnDestroy {

  toppings = new FormControl<Toppings>(Toppings.parcela1);
  toppingList: Toppings[] = Object.values(Toppings);

  @Input() vetor: Produto[] = [];
  @Output() produtoSelecionado = new EventEmitter<Produto>();

  produtoSelecionadoAtual: Produto | null = null;

  constructor(private service: ProdutoService, private calculoPrecoService: CalculoPrecoService ) {}

  private unsubscribe$ = new Subject<void>();

  ngOnInit(){
    this.selecionar();
  }


  selecionar(): void {
    this.service.selecionar().subscribe(retorno => {
      // Formata o preço de cada produto
      this.vetor = retorno.map(produto => {
        //produto.precoNumerico = this.calculoPrecoService.formatarPreco(produto.preco);
        produto.precoFinal = this.calculoPrecoService.aplicarPorcentagem(produto.preco, 40);
        produto.toppingsControl = new FormControl('');
        produto.toppingsControl.valueChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((topping: Toppings) => {
          this.atualizarParcelamento(produto, topping);
        });
        return produto;
      });
    });

  }

  exibirParcelamento(produto: Produto) {
    produto.mostrarParcelamento = !produto.mostrarParcelamento;

    // Se o parcelamento for exibido, calcula o valor parcelado
    if (produto.mostrarParcelamento) {

      const toppingSelecionado = produto.toppingsControl?.value as Toppings;
      produto.precoParcelado = this.calculoPrecoService.obterValorParcela(produto.preco, toppingSelecionado);

      console.log(Toppings);
    } else {
      // Se o parcelamento for oculto, restaura o preço original
      produto.precoFinal = this.calculoPrecoService.aplicarPorcentagem(produto.preco, 40);
    }
  }

   atualizarParcelamento(produto: Produto, topping: Toppings) {
    // Atualiza o preço formatado com o valor parcelado
    if (topping !== null && topping !== undefined) {
      produto.precoParcelado = this.calculoPrecoService.obterValorParcela(produto.preco, topping);
      }
    }

  voltarParaLista(produto: Produto) {
    produto.mostrarParcelamento = false;

    // Volta ao preço formatado original ao fechar a seção de parcelamento
    if (!produto.mostrarParcelamento) {

      //produto.preco = this.calculoPrecoService.aplicarPorcentagem(produto.preco, 40);
      produto.toppingsControl = new FormControl('');
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

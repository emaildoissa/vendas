import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-produtos-cpu',
  standalone: true,
  imports: [MatCard,
    MatToolbarModule,
    MatCardModule,
    RouterLink,
    CommonModule,
    MatGridListModule


  ],
  templateUrl: './produtos-cpu.component.html',
  styleUrl: './produtos-cpu.component.scss'
})
export class ProdutosCpuComponent {

  title = 'vendas';
  produtos: any[] = [];
  produtoSelecionado: any = null;  // Controla qual produto está selecionado

  constructor() {
    import(`../assets/dados.json`).then(data => {
      this.produtos = data.default;

      // Atualiza os preços com base no percentual
      const percentualAumento = 15;
      const fatorAumento = 1 + (percentualAumento / 100);

      // Adiciona a propriedade 'mostrarParcelamento' a cada produto
      this.produtos = this.produtos.map(produto => {
        const precoNumerico = parseFloat(produto.preco.replace('R$', '').replace('.', '').replace(',', '.').trim());

        if (isNaN(precoNumerico)) {
          console.warn(`Preço inválido para o produto ${produto.nome}: ${produto.preco}`);
          return produto;
        }

        const precoAjustado = precoNumerico * fatorAumento;

        return {
          ...produto,
          precoOriginal: `R$${precoNumerico.toFixed(2).replace('.', ',')}`,
          precoAjustado: `R$${precoAjustado.toFixed(2).replace('.', ',')}`,
          mostrarParcelamento: false  // Propriedade para controlar a exibição do parcelamento
        };
      });
    }).catch(error => {
      console.error('Erro ao carregar dados:', error);
    });
  }

  // Função para exibir o parcelamento e ocultar os outros produtos
  exibirParcelamento(produto: any) {
      this.produtoSelecionado = produto;  // Armazena o produto selecionado
      produto.mostrarParcelamento = !produto.mostrarParcelamento;  // Alterna a exibição do parcelamento
    }

  // Função para retornar à lista de produtos
  voltarParaLista() {
    this.produtoSelecionado = null;  // Define o produto selecionado como nulo para mostrar todos os produtos novamente
    this.produtos.forEach(produto =>{
      produto.mostrarParcelamento = false;
    });
  }
}

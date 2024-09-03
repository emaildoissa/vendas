import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vendas';
  produtos: any[] = [];

  constructor() {
    import(`../app/assets/dados.json`).then(data => {
      this.produtos = data.default;

      // Suponha que você queira aumentar o preço em 15%
      const percentualAumento = 15;
      const fatorAumento = 1 + (percentualAumento / 100);

      // Atualiza os preços com base no percentual
      this.produtos = this.produtos.map(produto => {
        // Limpa e converte a string de preço para número
        const precoNumerico = parseFloat(produto.preco.replace('R$', '').replace('.', '').replace(',', '.').trim());

        if (isNaN(precoNumerico)) {
          console.warn(`Preço inválido para o produto ${produto.nome}: ${produto.preco}`);
          return produto; // Retorna o produto sem alteração se o preço for inválido
        }

        // Calcula o preço ajustado
        const precoAjustado = precoNumerico * fatorAumento;

        // Formata o preço original e ajustado para o formato R$
        const precoOriginalFormatado = `R$${precoNumerico.toFixed(2).replace('.', ',')}`;
        const precoAjustadoFormatado = `R$${precoAjustado.toFixed(2).replace('.', ',')}`;

        return {
          ...produto,
          precoOriginal: precoOriginalFormatado,
          precoAjustado: precoAjustadoFormatado
        };
      });
    }).catch(error => {
      console.error('Erro ao carregar dados:', error);
    });
  }
}

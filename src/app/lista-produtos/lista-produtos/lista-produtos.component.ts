import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Produto } from '../../model/Produto';
import { ProdutoService } from '../../service/produto.service';
import { CalculoPrecoService } from '../../service/calculo/calculo-preco.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.scss'
})
export class ListaProdutosComponent {

  constructor(private produtoService:ProdutoService, private calculoPrecoService: CalculoPrecoService ){}

  vetor: Produto[] = [];

  formulario = new FormGroup({
    id: new FormControl(null),
    nome: new FormControl(''),
    foto: new FormControl(''),
    preco: new FormControl (null)

  })

  ngOnInit(){
   this.selecionar();
  }

  selecionar(): void {
    this.produtoService.selecionar().subscribe(retorno => {
      this.vetor = retorno.map(produto => {
        const produtoFormatado = {
          ...produto,
          precoFinal: this.calculoPrecoService.aplicarPorcentagem(produto.preco, 40)
        };
        return produtoFormatado;
      });
    });
  }

  selecionarProduto(indice:number){
    this.formulario.setValue({
      id: this.vetor[indice].id,
      nome: this.vetor[indice].nome,
      preco: this.vetor[indice].preco,
      foto: this.vetor[indice].foto
    })
console.log(this.vetor[indice].preco);
  }
}

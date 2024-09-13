import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../model/Produto';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  url: string = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  selecionar():Observable<Produto[]>{
    return this.http.get<Produto[]>(this.url);
  }

  cadastrar(obj:Produto):Observable<Produto>{
    return this.http.post<Produto>(this.url, obj);
  }

  // Método para alterar produtos
  alterar(obj:Produto):Observable<Produto>{
    return this.http.put<Produto>(`${this.url}/${obj.id}`, obj);
  }

  remover(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}

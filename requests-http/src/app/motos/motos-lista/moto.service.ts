import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Moto } from '../moto';
import { delay, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MotoService {

private readonly APIMotos = `${environment.API}motos`

  constructor(private http:HttpClient){}



  listar(){
    return this.http.get<Moto[]>(`${this.APIMotos}`).pipe(
      delay(1500),
      tap(console.log)
    )
  }

  carregarPorId(id:any){
    return this.http.get<Moto>(`${this.APIMotos}/${id}`).pipe(take(1))
  }

  private adicionar(moto:Moto){
    return this.http.post(this.APIMotos, moto).pipe(take(1))
  }

  private editar(moto:Moto){
   return this.http.put(`${this.APIMotos}/${moto.id}`,moto).pipe(take(1))
  }

  criar(moto:Moto){
    if(moto.id){
      return this.editar(moto)
    }
    return this.adicionar(moto)
  }

  excluir(id:number){
    return this.http.delete(`${this.APIMotos}/${id}`).pipe(take(1))
  }
}

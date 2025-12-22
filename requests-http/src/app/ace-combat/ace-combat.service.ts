import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { delay, take, tap } from "rxjs";
import { AceCombat } from "./aceCombat";

@Injectable({
  providedIn:'root'
})

export class AceCombatService{

  private readonly APIAces = `${environment.API}acecombats`

  constructor(private http: HttpClient){}

  listar(){
    return this.http.get<AceCombat[]>(this.APIAces).pipe(
      delay(2000),
      tap(console.log)
    )
  }

  carregarPorId(id:number){
    return this.http.get<AceCombat>(`${this.APIAces}/${id}`).pipe(take(1))
  }

  private adicionar(aceCombat:AceCombat){
    return this.http.post<AceCombat>(this.APIAces,aceCombat).pipe(take(1))
  }

  private atualizar(aceCombat:AceCombat){
    return this.http.put<AceCombat>(`${this.APIAces}/${aceCombat.id}`,aceCombat)
  }

  criar(aceCombat:AceCombat){
    if(aceCombat.id){
      return this.atualizar(aceCombat)
    }
    return this.adicionar(aceCombat)
  }

  excluir(id:number){
    return this.http.delete<AceCombat>(`${this.APIAces}/${id}`).pipe(take(1))
  }


}

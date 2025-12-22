
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Nendoroid } from '../nendoroid';
import { delay, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NendoroidService {


private readonly APINendo = `${environment.API}nendoroids`

constructor(private http: HttpClient) {}

listar(){
  return this.http.get<Nendoroid[]>(this.APINendo).pipe(
    delay(2000),
    tap(console.log)
  )
}

carregarPorId(id:number){
  return this.http.get<Nendoroid>(`${this.APINendo}/${id}`).pipe(take(1))
}

private criar(nendoroid:Nendoroid){
  return this.http.post(this.APINendo,nendoroid).pipe(take(1))
}

private atualizar(nendoroid:Nendoroid){
  return this.http.put(`${this.APINendo}/${nendoroid.id}`,nendoroid).pipe(take(1))
}

salvar(nendoroid:Nendoroid){
  if(nendoroid.id){
    return this.atualizar(nendoroid)
  }
  return this.criar(nendoroid)
}

excluir(id:number){
  return this.http.delete(`${this.APINendo}/${id}`).pipe(take(1))
}

}

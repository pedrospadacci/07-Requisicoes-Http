import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from './curso';
import { delay, take, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

private readonly API = `${environment.API}cursos`

constructor(private httpClient:HttpClient) { }

list(){
  return this.httpClient.get<Curso[]>(this.API)
  .pipe(
    delay(2000),
    tap(console.log)
  )
}

loadById(id:number){
  return this.httpClient.get<Curso>(`${this.API}/${id}`).pipe(
    take(1)
  )
}

private create(curso:Curso){
  return this.httpClient.post(this.API, curso).pipe(
    take(1)
  )
}

private update(curso:Curso){
  return this.httpClient.put(`${this.API}/${curso.id}`,curso).pipe(take(1))
}

save(curso:Curso){
  if(curso.id){
    return this.update(curso)
  }
  return this.create(curso)
}

delete(id:number){
  return this.httpClient.delete(`${this.API}/${id}`).pipe(take(1))
}

}

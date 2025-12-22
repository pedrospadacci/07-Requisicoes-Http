import { Injectable, model } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { Moto } from "../moto";
import { MotoService } from "../motos-lista/moto.service";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn:'root'
})

export class MotosResolver implements Resolve<Moto>{

  constructor(private motoService:MotoService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Moto>| any | Promise<Moto> | Moto {
    if(route.params && route.params['id']){
      return this.motoService.carregarPorId(route.params['id'])
    }
    return of({
      id:null,
      brand:null,
      model:null
    })
  }
}

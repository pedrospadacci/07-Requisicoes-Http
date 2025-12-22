import { Injectable } from "@angular/core";
import { Nendoroid } from "../nendoroid";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { NendoroidService } from "../nendoroids-list/nendoroid.service";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn:'root'
})

export class NendoroidsGuardResolver implements Resolve<Nendoroid>{

  constructor(private nendoService:NendoroidService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Nendoroid>| any | Promise<Nendoroid> | Nendoroid {
    if(route.params && route.params['id']){
      return this.nendoService.carregarPorId(route.params['id'])
    }
    return of(
      {
        id:null,
        franchise:null,
        character:null
      }
    )
  }
}

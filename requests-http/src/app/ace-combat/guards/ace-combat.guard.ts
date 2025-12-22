import { AceCombat } from './../aceCombat';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from 'rxjs';
import { AceCombatService } from '../ace-combat.service';

@Injectable({
  providedIn:'root'
})

export class AceCombatGuardResolver implements Resolve<AceCombat>{

  constructor(private aceCombatService:AceCombatService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AceCombat> | any | Promise<AceCombat>| AceCombat {
    if(route.params && route.params['id']){
      return this.aceCombatService.carregarPorId(route.params['id'])
    }
    return of({
      id:null,
      titulo:null,
      ano:null
    })
  }
}

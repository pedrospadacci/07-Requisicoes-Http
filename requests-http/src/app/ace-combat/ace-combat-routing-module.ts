import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AceCombatList } from './ace-combat-list/ace-combat-list';
import { AceCombatForm } from './ace-combat-form/ace-combat-form';
import { AceCombatGuardResolver } from './guards/ace-combat.guard';

const routes: Routes = [
  {path:'',component:AceCombatList},
  {path:'novo', component:AceCombatForm, resolve:{aceCombat:AceCombatGuardResolver}},
  {path:'editar/:id', component:AceCombatForm, resolve:{aceCombat:AceCombatGuardResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AceCombatRoutingModule { }

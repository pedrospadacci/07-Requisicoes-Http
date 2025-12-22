import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotosLista } from './motos-lista/motos-lista';
import { MotosForms } from './motos-forms/motos-forms';
import { MotosResolver } from './guards/motos-resolver.guard';

const motoRoutes: Routes = [
  {path:'', component:MotosLista},
  {path:'novo',component:MotosForms, resolve:{moto:MotosResolver}},
  {path:'editar/:id',component:MotosForms, resolve:{moto:MotosResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(motoRoutes)],
  exports: [RouterModule]
})
export class MotosRoutingModule { }

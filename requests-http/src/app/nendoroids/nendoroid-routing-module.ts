import { NgModule } from "@angular/core";
import { Route, Router, RouterModule, Routes } from "@angular/router";
import { NendoroidsList } from "./nendoroids-list/nendoroids-list";
import { NendoroidsForm } from "./nendoroids-form/nendoroids-form";
import { NendoroidsGuardResolver } from "./guards/nendoroids-resolver.guard";

const nendoRoute:Routes = [
  {path:'', component:NendoroidsList},
  {path:'novo', component:NendoroidsForm,resolve:{nendoroid:NendoroidsGuardResolver}},
  {path:'editar/:id', component:NendoroidsForm,
     resolve:{nendoroid:NendoroidsGuardResolver}}
]

@NgModule({
  imports:[RouterModule.forChild(nendoRoute)],
  exports:[RouterModule]
})
export class NendoroidRoutingModule{}

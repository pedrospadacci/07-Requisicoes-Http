import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibSearch } from './lib-search/lib-search';

const routes: Routes = [
  {path:'',component:LibSearch}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveSearchRoutingModule { }

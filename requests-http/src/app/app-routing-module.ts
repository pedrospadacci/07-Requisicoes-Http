import { UnsubscribeRxjsModule } from './unsubscribe-rxjs/unsubscribe-rxjs-module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'/upload'},
  {path:'cursos', loadChildren: ()=>import('./cursos/cursos-module').then(m=>m.CursosModule)},
  {path:'nendos',loadChildren: ()=>import('./nendoroids/nendoroids-module').then(m=>m.NendoroidsModule)},
  {path:'motos', loadChildren: ()=>import('./motos/motos-module').then(m=>m.MotosModule)},
  {path:'aceCombat',loadChildren:()=>import('./ace-combat/ace-combat-module').then(m=>m.AceCombatModule)},
  {path:'poc-rxjs',loadChildren: ()=>import('./unsubscribe-rxjs/unsubscribe-rxjs-module').then(m=>m.UnsubscribeRxjsModule)},
  {path:'upload',loadChildren: ()=>import('./upload-file/upload-file-module').then(m=>m.UploadFileModule)},
  {path:'reactive-search',loadChildren: ()=>import('./reactive-search/reactive-search-module').then(m=>m.ReactiveSearchModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

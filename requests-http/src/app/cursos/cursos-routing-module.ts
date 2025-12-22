import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosLista } from './cursos-lista/cursos-lista';
import { CursosForm } from './cursos-form/cursos-form';
import { CursoResolverGuard } from './guards/curso-resolver.guard';

const cursosRoutes: Routes = [
  {path:'', component:CursosLista},
  {path:'novo', component:CursosForm, resolve:{
    curso: CursoResolverGuard
  }},
  {path:'editar/:id', component:CursosForm, resolve:{
    curso: CursoResolverGuard
  }},
];

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }

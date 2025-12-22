import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing-module';
import { CursosLista } from './cursos-lista/cursos-lista';
import { CursosForm } from './cursos-form/cursos-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CursosLista,
    CursosForm
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CursosModule { }

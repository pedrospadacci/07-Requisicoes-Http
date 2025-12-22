import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotosRoutingModule } from './motos-routing-module';
import { MotosLista } from './motos-lista/motos-lista';
import { MotosForms } from './motos-forms/motos-forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MotosLista,
    MotosForms
  ],
  imports: [
    CommonModule,
    MotosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class MotosModule { }

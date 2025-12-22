import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NendoroidsList } from './nendoroids-list/nendoroids-list';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NendoroidRoutingModule } from './nendoroid-routing-module';
import { NendoroidsForm } from './nendoroids-form/nendoroids-form';



@NgModule({
  declarations: [
    NendoroidsList,
    NendoroidsForm
  ],
  imports: [
    CommonModule,
    NendoroidRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class NendoroidsModule { }

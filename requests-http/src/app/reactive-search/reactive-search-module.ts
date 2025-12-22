import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveSearchRoutingModule } from './reactive-search-routing-module';
import { LibSearch } from './lib-search/lib-search';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LibSearch
  ],
  imports: [
    CommonModule,
    ReactiveSearchRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    LibSearch
  ]
})
export class ReactiveSearchModule { }

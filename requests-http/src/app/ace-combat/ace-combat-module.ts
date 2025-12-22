import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AceCombatRoutingModule } from './ace-combat-routing-module';
import { AceCombatList } from './ace-combat-list/ace-combat-list';
import { AceCombatForm } from './ace-combat-form/ace-combat-form';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AceCombatList,
    AceCombatForm
  ],
  imports: [
    CommonModule,
    AceCombatRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AceCombatModule { }

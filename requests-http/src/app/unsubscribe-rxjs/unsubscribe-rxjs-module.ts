import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsubscribeRxjsRoutingModule } from './unsubscribe-rxjs.routing.module';
import { PocAsyncComponent } from './components/poc-async.component';
import { PocBaseComponent } from './poc-base/poc-base.component';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';
import { PocTakeComponent } from './components/poc-take.component';
import { PocTakeUntil } from './components/poc-take-until.component';
import { PocUnsubComponent } from './components/poc-unsub.component';
import { PocComponent } from './components/poc.component';



@NgModule({
  declarations: [
    PocAsyncComponent,
    PocBaseComponent,
    UnsubscribePocComponent,
    PocTakeComponent,
    PocTakeUntil,
    PocUnsubComponent,
    PocComponent
  ],
  imports: [
    CommonModule,
    UnsubscribeRxjsRoutingModule
  ]
})
export class UnsubscribeRxjsModule { }

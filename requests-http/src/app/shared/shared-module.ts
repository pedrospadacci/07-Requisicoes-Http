import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AlertModalNendoComponent } from './alert-modal-nendo/alert-modal-nendo.component';
import { AlertModalService } from './alert-modal.service';
import { ConfirmModal } from './confirm-modal/confirm-modal';
import { ConfirmModalNendo } from './confirm-modal-nendo/confirm-modal-nendo';
import { AlertModalNendoService } from './alert-modal-nendo';
import { AlertModalMoto } from './alert-modal-moto/alert-modal-moto';
import { ConfirmModalMoto } from './confirm-modal-moto/confirm-modal-moto';
import { AlertModalMotoService } from './alert-modal-moto';
import { AlertModalAceCombat } from './alert-modal-ace-combat/alert-modal-ace-combat';
import { ConfirmModalAceCombat } from './confirm-modal-ace-combat/confirm-modal-ace-combat';



@NgModule({
  declarations: [
    AlertModalComponent,
    AlertModalNendoComponent,
    ConfirmModal,
    ConfirmModalNendo,
    AlertModalMoto,
    ConfirmModalMoto,
    AlertModalAceCombat,
    ConfirmModalAceCombat
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AlertModalComponent,
    AlertModalNendoComponent,
    AlertModalMoto
  ],
  providers:[
    AlertModalService,
    AlertModalNendoService,
    AlertModalMotoService
    ]
})
export class SharedModule { }

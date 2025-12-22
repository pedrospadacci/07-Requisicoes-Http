import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-modal-ace-combat',
  standalone: false,
  templateUrl: './alert-modal-ace-combat.html',
  styleUrl: './alert-modal-ace-combat.scss',
})
export class AlertModalAceCombat {
  @Input() mensagem!:string
  @Input() tipo = 'success'

  constructor(private bsModalRef:BsModalRef){}

  fechar(){
    this.bsModalRef.hide()
  }
}

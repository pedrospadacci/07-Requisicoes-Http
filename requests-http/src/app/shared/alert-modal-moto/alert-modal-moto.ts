import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal-moto',
  standalone: false,
  templateUrl: './alert-modal-moto.html',
  styleUrl: './alert-modal-moto.scss',
})
export class AlertModalMoto {
  @Input() tipo= 'success'
  @Input() mensagem!:string

  constructor(public bsModalRef:BsModalRef){}

  fechar(){
    this.bsModalRef.hide()
  }
}

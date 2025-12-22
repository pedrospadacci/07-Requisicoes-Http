import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal-nendo',
  standalone:false,
  templateUrl: './alert-modal-nendo.component.html',
  styleUrls: ['./alert-modal-nendo.component.css']
})
export class AlertModalNendoComponent{
  @Input() tipoAlerta = 'success'
  @Input() mensagem!: string

  constructor(public bsModalRef:BsModalRef) { }

  onClose(){
    this.bsModalRef.hide()
  }
}

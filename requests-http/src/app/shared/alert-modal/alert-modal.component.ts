import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  standalone:false,
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent{
  @Input() tipo = 'success'
  @Input() message!:string

  constructor(public bsModalRef:BsModalRef) { }

  onClose(){
    this.bsModalRef.hide()
  }
}

import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModal } from './confirm-modal/confirm-modal';

export enum AlertTypes{
  DANGER ='danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  bsModalRef!: BsModalRef

constructor(private modalService:BsModalService) { }

private showAlert(message:string, type: string, dismissTimeOut?:number){
  let bsModalRef:BsModalRef = this.modalService.show(AlertModalComponent)
  bsModalRef.content.tipo = type
  bsModalRef.content.message  = message

  if(dismissTimeOut){
    setTimeout(()=>this.bsModalRef.hide(), 5000)
  }
}

showAlertDanger(message:string){
  this.showAlert(message, AlertTypes.DANGER,5500)

}
showAlertSuccess(message:string){
  this.showAlert(message, AlertTypes.SUCCESS, 5500)
}

showConfirm(title:string, msg: string, okText?:string, cancelTxt?:string){
 let bsModalRef:BsModalRef = this.modalService.show(ConfirmModal)
  bsModalRef.content.titulo = title
  bsModalRef.content.msg = msg
  if(okText){
    bsModalRef.content.okTxt = okText
  }
  if(cancelTxt){
    bsModalRef.content.cancelTxt = cancelTxt
  }

  return (<ConfirmModal>bsModalRef.content).confirmResult
}

}

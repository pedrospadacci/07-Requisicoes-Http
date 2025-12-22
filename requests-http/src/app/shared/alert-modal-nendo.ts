import { AlertModalNendoComponent } from './alert-modal-nendo/alert-modal-nendo.component';

import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalNendo } from './confirm-modal-nendo/confirm-modal-nendo';

export enum  TiposAlertas{
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalNendoService {

  bsModalRef!:BsModalRef

  constructor(private modalService:BsModalService){}

  private mostrarAlerta(mensagem:string, tipo:string, tempo?:number){
    let bsModalRef:BsModalRef = this.modalService.show(AlertModalNendoComponent)
    bsModalRef.content.tipoAlerta = tipo
    bsModalRef.content.mensagem = mensagem

     if(tempo){
       setTimeout(()=>bsModalRef.hide(),tempo)
     }
  }

  mostrarAlertaSucesso(mensagem:string){
    this.mostrarAlerta(mensagem, TiposAlertas.SUCCESS,2500)
  }

  mostrarAlertaFalhou(mensagem:string){
    this.mostrarAlerta(mensagem, TiposAlertas.DANGER,2500)
  }

  mostrarConfirmacao(titulo:string, mensagem:string, textoOk?:string,textoCancelar?:string){
    let bsModalRef:BsModalRef = this.modalService.show(ConfirmModalNendo)
    bsModalRef.content.msg = mensagem
    bsModalRef.content.titulo = titulo
    if(textoOk){
      bsModalRef.content.textoCancelar = textoCancelar
    }
    if(textoCancelar){
      bsModalRef.content.textoOk = textoOk
    }

    return (<ConfirmModalNendo>bsModalRef.content).resultadoConfirm
  }
}

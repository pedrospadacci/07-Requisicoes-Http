import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalMoto } from './alert-modal-moto/alert-modal-moto';
import { ConfirmModalMoto } from './confirm-modal-moto/confirm-modal-moto';

export enum Alertas{
  PERIGO = 'danger',
  SUCESSO = 'success'
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalMotoService {
  bsModalRef!:BsModalRef

  constructor(private modalService:BsModalService){}

  private mostrarAlerta(mensagem:string, tipo:string, tempo?:number){
    let bsModalRef:BsModalRef = this.modalService.show(AlertModalMoto)
    bsModalRef.content.tipo = tipo
    bsModalRef.content.mensagem = mensagem
    if(tempo){
      setTimeout(()=>bsModalRef.hide(),tempo)
    }
  }

  mostrarAlertaSucesso(mensagem:string){
    this.mostrarAlerta(mensagem, Alertas.SUCESSO,2500)
  }

  mostrarAlertaFalhou(mensagem:string){
    this.mostrarAlerta(mensagem,Alertas.PERIGO,2500)
  }

  mostrarConfirmacao(titulo:string, mensagem:string, textoOk?:string, textoCancelar?:string){
    let bsModalRef:BsModalRef = this.modalService.show(ConfirmModalMoto)
    bsModalRef.content.titulo = titulo
    bsModalRef.content.mensagem = mensagem
    if(textoOk){
      bsModalRef.content.textoOk = textoOk
    }
    if(textoCancelar){
      bsModalRef.content.textoCancelar = textoCancelar
    }

    return (<ConfirmModalMoto>bsModalRef.content).resultadoConfirmar
  }
}

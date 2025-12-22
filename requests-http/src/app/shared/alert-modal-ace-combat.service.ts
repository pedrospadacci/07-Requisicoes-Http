import { AlertModalAceCombat } from './alert-modal-ace-combat/alert-modal-ace-combat';
import { Injectable } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ConfirmModalAceCombat } from './confirm-modal-ace-combat/confirm-modal-ace-combat';

export enum Alertas{
  SUCESSO = 'success',
  PERIGO = 'danger'
}

@Injectable({
  providedIn:'root'
})

export class AlertModalAceCombatService{

  bsModalRef!:BsModalRef

  constructor(private modalService:BsModalService){}

  private mostrarAlerta(mensagem:string, tipo:string, tempo?:number){
    let bsModalRef:BsModalRef = this.modalService.show(AlertModalAceCombat)
    bsModalRef.content.mensagem = mensagem
    bsModalRef.content.tipo = tipo
    if(tempo){
      setTimeout(()=>bsModalRef.hide(),tempo)
    }
  }

  mostrarAlertaSucesso(mensagem:string){
    this.mostrarAlerta(mensagem,Alertas.SUCESSO,2750)
  }

  mostrarAlertaFracasso(mensagem:string){
    this.mostrarAlerta(mensagem,Alertas.PERIGO,2750)
  }

  mostrarConfirmacao(mensagem:string, titulo:string, textoOk?:string, textoCancelar?:string){
    let bsModalRef:BsModalRef = this.modalService.show(ConfirmModalAceCombat)
    bsModalRef.content.titulo = titulo
    bsModalRef.content.mensagem = mensagem
    if(textoOk){
      bsModalRef.content.textoOk = textoOk
    }
    if(textoCancelar){
      bsModalRef.content.textoCancelar = textoCancelar
    }
    return (<ConfirmModalAceCombat>bsModalRef.content).resultadoConfirmado
  }


}

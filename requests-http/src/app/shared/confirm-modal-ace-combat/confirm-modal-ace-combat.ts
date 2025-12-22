import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal-ace-combat',
  standalone: false,
  templateUrl: './confirm-modal-ace-combat.html',
  styleUrl: './confirm-modal-ace-combat.scss',
})
export class ConfirmModalAceCombat {

  @Input()titulo!:string
  @Input()mensagem!:string
  @Input()textoOk = 'Ok'
  @Input()textoCancelar = 'Cancelar'
  resultadoConfirmado !: Subject<boolean>

  constructor(private bsModalRef:BsModalRef){}

  ngOnInit(){
    this.resultadoConfirmado = new Subject()
  }

  confirmar(){
    this.confirmarEFechar(true)
  }

  fechar(){
    this.confirmarEFechar(false)
  }

  private confirmarEFechar(valor:boolean){
    this.resultadoConfirmado.next(valor)
    this.bsModalRef.hide()
  }


}

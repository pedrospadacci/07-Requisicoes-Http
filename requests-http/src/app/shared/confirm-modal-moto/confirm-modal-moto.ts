import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal-moto',
  standalone: false,
  templateUrl: './confirm-modal-moto.html',
  styleUrl: './confirm-modal-moto.scss',
})
export class ConfirmModalMoto {
  @Input() textoCancelar = 'Cancelar'
  @Input() mensagem!:string
  @Input()textoOk = 'Ok'
  @Input() titulo!:string
  resultadoConfirmar!: Subject<boolean>

  constructor(private bsModalRef:BsModalRef){}

  ngOnInit(){
    this.resultadoConfirmar = new Subject()
  }

  confirmar(){
    this.confirmarEFechar(true)
  }

  fechar(){
    this.confirmarEFechar(false)
  }

  private confirmarEFechar(valor:boolean){
    this.resultadoConfirmar.next(valor)
    this.bsModalRef.hide()
  }
}

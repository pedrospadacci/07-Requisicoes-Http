import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal-nendo',
  standalone: false,
  templateUrl: './confirm-modal-nendo.html',
  styleUrl: './confirm-modal-nendo.scss',
})
export class ConfirmModalNendo {
  @Input() msg!: string
  @Input() titulo!: string
  @Input() textoCancelar = 'Cancelar'
  @Input() textoOk = 'Ok'
  resultadoConfirm!: Subject<boolean>

  constructor(private bsModalRef:BsModalRef){}

  ngOnInit(){
    this.resultadoConfirm = new Subject()
  }

  confirmar(){
    this.confirmarEFechar(true)
  }

  fechar(){
    this.confirmarEFechar(false)
  }

  private confirmarEFechar(valor:boolean){
    this.resultadoConfirm.next(valor)
    this.bsModalRef.hide()
  }
}

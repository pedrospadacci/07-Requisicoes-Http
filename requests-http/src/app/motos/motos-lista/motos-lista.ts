import { AlertModalMoto } from './../../shared/alert-modal-moto/alert-modal-moto';
import { AlertModalMotoService } from './../../shared/alert-modal-moto';
import { MotoService } from './moto.service';
import { Component, ViewChild } from '@angular/core';
import { catchError, Observable, empty, EMPTY, take, switchMap } from 'rxjs';
import { Moto } from '../moto';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-motos-lista',
  standalone: false,
  templateUrl: './motos-lista.html',
  styleUrl: './motos-lista.scss',
  preserveWhitespaces:true
})
export class MotosLista {
  motos$!:Observable<Moto[]>
  bsModalRef!:BsModalRef

  deleteModalMotoRef!:BsModalRef
  @ViewChild('deleteModalMoto',{static:true}) deleteModalMoto:any
  motoSelecionada!:Moto

  constructor(
    private motoService:MotoService,
    private modalService:BsModalService,
    private alertModalMotoService:AlertModalMotoService,
    private router:Router,
    private route:ActivatedRoute
  ){}

  ngOnInit(){
    this.atualizar()
  }

  atualizar(){
    this.motos$ = this.motoService.listar()
    .pipe(
      catchError(error=>{
        this.lidarErro()
        return EMPTY
      })
    )
  }

  lidarErro(){
    this.bsModalRef = this.modalService.show(AlertModalMoto)
    this.bsModalRef.content.tipo = 'danger'
    this.bsModalRef.content.mensagem = 'Erro! As motos não puderam ser carregadas'
  }

  editarMoto(id:any){
    this.router.navigate(['editar', id], {relativeTo:this.route})
  }

  excluirMoto(moto:Moto){
    this.motoSelecionada = moto
    const resultado$ = this.alertModalMotoService.mostrarConfirmacao('Confirmação','Tem certeza que deseja excluir esta moto da lista?')
    resultado$.asObservable().pipe(
      take(1),
      switchMap(resultado=>resultado?this.motoService.excluir(moto.id):EMPTY)
    ).subscribe(
      sucesso=>{this.atualizar()},
      erro=>{this.alertModalMotoService.mostrarAlertaFalhou('Erro ao excluir moto')}
    )
  }



  confirmarExclusao(){
    this.motoService.excluir(this.motoSelecionada.id).subscribe(
      sucesso=>this.atualizar(),
      erro=>this.alertModalMotoService.mostrarAlertaFalhou('Erro ao remover moto!')
    )
  }

  negarExclusao(){
    this.deleteModalMotoRef.hide()
  }
}

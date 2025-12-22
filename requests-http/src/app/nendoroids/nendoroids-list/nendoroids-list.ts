import { Component, ViewChild } from '@angular/core';
import { catchError, EMPTY, empty, Observable, switchMap, take } from 'rxjs';
import { Nendoroid } from '../nendoroid';
import { NendoroidService } from './nendoroid.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalNendoComponent } from '../../shared/alert-modal-nendo/alert-modal-nendo.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalNendoService } from '../../shared/alert-modal-nendo';

@Component({
  selector: 'app-nendoroids-list',
  standalone: false,
  templateUrl: './nendoroids-list.html',
  styleUrl: './nendoroids-list.scss',
  preserveWhitespaces:true
})
export class NendoroidsList {
  nendoroids$!:Observable<Nendoroid[]>
  bsModalRef!:BsModalRef

  deleteModalNendoRef!:BsModalRef
  @ViewChild('deleteModalNendo',{static:true}) deleteNendoModal:any
  nendoSelecionado!:Nendoroid

  constructor(
    private nendoService:NendoroidService,
    private modalService:BsModalService,
    private router:Router,
    private route:ActivatedRoute,
    private alertModalNendo:AlertModalNendoService
  ){}

  ngOnInit(){
    this.atualizar()
  }

  atualizar(){
    this.nendoroids$ = this.nendoService.listar()
    .pipe(
      catchError(error =>{
        console.log(error)
        this.lidarErro()
        return empty()
    })
    )
  }

  lidarErro(){
    this.bsModalRef = this.modalService.show(AlertModalNendoComponent)
    this.bsModalRef.content.tipoAlerta = 'danger'
    this.bsModalRef.content.mensagem = 'Erro! Os Nendoroids não puderam ser carregados'
  }

  editarNendo(id:any){
    this.router.navigate(['editar', id], {relativeTo:this.route})
  }

  excluirNendo(nendoroid:Nendoroid){
    this.nendoSelecionado = nendoroid
    const resultado$ = this.alertModalNendo.mostrarConfirmacao('Confirmação','Tem certeza que deseja remover este nendoroid?')
    resultado$.asObservable().pipe(
      take(1),
      switchMap(resposta=> resposta?this.nendoService.excluir(nendoroid.id):EMPTY)
    ).subscribe(
      sucesso=>{this.atualizar()},
      erro=>{this.alertModalNendo.mostrarAlertaFalhou('Erro ao excluir nendoroiod')}
    )

  }

  confirmarExclusao(){
    this.nendoService.excluir(this.nendoSelecionado.id).subscribe(
      sucesso=>this.atualizar(),
      erro=>this.alertModalNendo.mostrarAlertaFalhou('Erro ao remover nendoroid!')
    )
    this.deleteModalNendoRef.hide()
  }

  negarExclusao(){
    this.deleteModalNendoRef.hide()
  }
}

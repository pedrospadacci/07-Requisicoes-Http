import { AlertModalAceCombatService } from './../../shared/alert-modal-ace-combat.service';
import { AceCombatService } from './../ace-combat.service';
import { Component, ViewChild } from '@angular/core';
import { catchError, EMPTY, Observable, switchMap, take } from 'rxjs';
import { AceCombat } from '../aceCombat';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalAceCombat } from '../../shared/alert-modal-ace-combat/alert-modal-ace-combat';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ace-combat-list',
  standalone: false,
  templateUrl: './ace-combat-list.html',
  styleUrl: './ace-combat-list.scss',
  preserveWhitespaces:true
})
export class AceCombatList {
  aceCombats$!:Observable<AceCombat[]>
  //bsModalRef!:BsModalRef
  aceCombatSelecionado!:AceCombat

  @ViewChild('deleteModalAceCombat',{static:true})deleteModalAceCombat:any

  deleteModalAceCombatRef!:BsModalRef

  constructor(
    private aceCombatService:AceCombatService,
    private modalService:BsModalService,
    private alertModalAceCombatService:AlertModalAceCombatService,
    private router:Router,
    private route:ActivatedRoute
  ){}

  ngOnInit(){
    this.atualizar()
  }

  atualizar(){
    this.aceCombats$ = this.aceCombatService.listar().pipe(
      catchError(error=>{
        this.lidarErro()
        return EMPTY
      }
    )
  )
  console.log(this.aceCombats$)
  }

  lidarErro(){
    this.alertModalAceCombatService.mostrarAlertaFracasso('Erro! Os títulos não puderam ser carregados')
  }

  editarAceCombat(id:any){
    this.router.navigate(['editar', id],{relativeTo:this.route})
  }

  excluirAceCombat(aceCombat:AceCombat){
    this.aceCombatSelecionado = aceCombat
    const resultado$ = this.alertModalAceCombatService.mostrarConfirmacao('Confirmação','Tem certeza que deseja excluir este título?')
    resultado$.asObservable().pipe(
      take(1),
      switchMap(resposta=>resposta?this.aceCombatService.excluir(aceCombat.id):EMPTY)
    ).subscribe(
      sucesso=>{this.atualizar()},
      erro=>{this.alertModalAceCombatService.mostrarAlertaFracasso('Erro ao excluir o título!')}
    )
  }

  confirmarExclusao(){
    this.aceCombatService.excluir(this.aceCombatSelecionado.id).subscribe(
      sucesso=>this.atualizar(),
      erro=>this.alertModalAceCombatService.mostrarAlertaFracasso('Erro ao tentar excluir!')
    )
  }

  negarExclusao(){
    this.deleteModalAceCombatRef.hide()
  }

}



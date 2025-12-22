import { Component, ElementRef, ViewChild } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { catchError, EMPTY, empty, Observable, Subject, switchMap, take } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { AlertModalService } from '../../shared/alert-modal.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Cursos2Services } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  standalone: false,
  templateUrl: './cursos-lista.html',
  styleUrl: './cursos-lista.scss',
  preserveWhitespaces:true
})
export class CursosLista {
  //cursos!: Curso[]
  //bsModalRef!: BsModalRef
  deleteModalRef !: BsModalRef
  @ViewChild('deleteModal',{static:true}) deleteModal!:any

  cursos$!:Observable<Curso[]>
  //error$ = new Subject<boolean>()

  cursoSelecionado!:Curso

  constructor(private service: Cursos2Services,
    private modalService:BsModalService,
    private alModalService:AlertModalService,
    private router:Router,
    private route:ActivatedRoute
  ){}

  ngOnInit(){
    //this.service.list().subscribe(dados=>this.cursos = dados)
    this.onRefresh()
  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      catchError( error => {
        console.error(error)
        //this.error$.next(true)
        //this.handleError()
        return empty()
      })
    )
  }

  handleError(){
    //this.alModalService.showAlertDanger('Erro ao Carregar curso! Tente novamente mais tarde')
    this.alModalService.showAlertDanger('Erro ao Carregar curso! Tente novamente mais tarde')
  }

  onEdit(id:any){
    this.router.navigate(['editar',id],{relativeTo:this.route})
  }

  onDelete(curso:Curso){
    this.cursoSelecionado = curso
    //this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' })
    const result$ = this.alModalService.showConfirm('Confirmação','Tem certeza que deseja remover este curso?')
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result=> result? this.service.delete(curso.id):EMPTY)
    )
    .subscribe(
      success=>{
        this.onRefresh()
      },
      error=>{
        this.alModalService.showAlertDanger('Erro ao Carregar curso! Tente novamente mais tarde')
      }
    )
  }

  onConfirmDelete(){
    this.service.delete(this.cursoSelecionado.id)
    .subscribe(
      success=>this.onRefresh(),
      error=>this.alModalService.showAlertDanger('Erro ao remover curso! Tente novamente mais tarde')
    )
    this.deleteModalRef.hide()
  }

  onDeclineDelete(){
    this.deleteModalRef.hide()
  }
}

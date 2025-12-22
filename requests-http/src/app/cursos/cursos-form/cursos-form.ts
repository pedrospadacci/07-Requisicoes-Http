import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../cursos.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs';


@Component({
  selector: 'app-cursos-form',
  standalone: false,
  templateUrl: './cursos-form.html',
  styleUrl: './cursos-form.scss',
  preserveWhitespaces:true
})
export class CursosForm {
  form!:FormGroup
  submitted = false
  exPlaceholder = 'Ex.: Java, C#, JavaScript, TypeScript, etc...'



  constructor(
     private fb:FormBuilder,
     private router:Router,
     private modal:AlertModalService,
     private service:CursosService,
     private location:Location,
     private route:ActivatedRoute
    ){}

  ngOnInit(){

    let registro = null

    // this.route.params.subscribe(
    //   (param:any)=> {
    //     const id = param['id']
    //     console.log(id)
    //     const curso$ = this.service.loadById(id)
    //     curso$.subscribe(curso=>{
    //       registro = curso
    //       this.updateForm(curso)
    //     })
    //   }
    // )

      //  this.route.params
      //  .pipe(
      //   map((param:any)=> param['id']),
      //   switchMap(id=> this.service.loadById(id))
      //  )
      //  .subscribe(curso=>  this.updateForm(curso))

    let curso = this.route.snapshot.data['curso']
    console.log(curso)

    this.form = this.fb.group({
      id:[curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    })
  }

  // updateForm(curso:any){
  //   this.form.patchValue({
  //     id:curso.id,
  //     nome: curso.nome
  //   })
  // }

  onSubmit(){
    this.submitted = true
    console.log(this.form.value)
    if(this.form.valid){
      console.log(`Formulário Submetido, valor no campo ${this.form.get('nome')?.value}`)
      let msgSuccess = 'Curso criado com sucesso!'
      let msgError = 'Erro ao criar o curso, tente novamente!'
      if(this.form.value.id){
        //update
          let msgSuccess = 'Curso atualizado com sucesso!'
          let msgError = 'Erro ao atualizar o curso, tente novamente!'
      }
      this.service.save(this.form.value).subscribe(
        success=>{
          this.modal.showAlertSuccess(msgSuccess)
          //this.location.back()
        },
        error=>{
          this.modal.showAlertDanger(msgError),
          ()=>console.log('Request Completo')
        }
        )
      // this.service.save(this.form.value).subscribe(
      //   success=>{
      //     this.modal.showAlertSuccess('Curso atualizado com sucesso!')
      //     this.location.back()
      //   },
      //   error=>{}
      // )
    }
  }

  onCancel(){
    this.submitted = false
    this.form.reset()
    console.log(`Formulário Cancelado`)
    //this.router.navigate(['/cursos'])
  }

  hasError(campo:any){
    return this.form.get(campo)?.errors
  }
}

import { MotoService } from './../motos-lista/moto.service';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertModalMotoService } from '../../shared/alert-modal-moto';

@Component({
  selector: 'app-motos-forms',
  standalone: false,
  templateUrl: './motos-forms.html',
  styleUrl: './motos-forms.scss',
})
export class MotosForms {

  formGroup!:FormGroup
  submetido = false

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private motoService:MotoService,
    private modalMoto:AlertModalMotoService
  ){}

  ngOnInit(){
    let moto = this.route.snapshot.data['moto']
    console.log(moto)

    this.formGroup = this.formBuilder.group({
      id:[moto.id],
      brand:[moto.brand,[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      model:[moto.model,[Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
    })
  }

  submeter(){
    this.submetido = true
    console.log(this.formGroup.value)
    if(this.formGroup.valid){
      console.log(this.formGroup.valid)
      let mensagemSucesso ='Moto adicionada!'
      let mensagemErro = 'Problemas em tentar adicionar a moto'
      if(this.formGroup.value.id){
        let mensagemSucesso = 'Moto adicionada!'
        let mensagemErro = 'Problemas em tentar adicionar a moto'
      }
      this.motoService.criar(this.formGroup.value).subscribe(
        sucesso=>{
          this.modalMoto.mostrarAlertaSucesso(mensagemSucesso)
          this.location.back()
        },
        erro=>{
          this.modalMoto.mostrarAlertaFalhou(mensagemErro)
        }
      )


    }
  }

  temErro(campo:any){
    return this.formGroup.get(campo)?.errors
  }

  cancelar(){
    this.submetido = false
    this.location.back()
  }
}

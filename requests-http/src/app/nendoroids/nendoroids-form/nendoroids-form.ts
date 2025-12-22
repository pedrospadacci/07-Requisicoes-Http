import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NendoroidService } from '../nendoroids-list/nendoroid.service';
import { Location } from '@angular/common';
import { AlertModalNendoService } from '../../shared/alert-modal-nendo';

@Component({
  selector: 'app-nendoroids-form',
  standalone: false,
  templateUrl: './nendoroids-form.html',
  styleUrl: './nendoroids-form.scss',
})
export class NendoroidsForm {
  fmGroup!: FormGroup
  submetido = false

  constructor(
    private route:ActivatedRoute,
    private location:Location,
    private formBuilder:FormBuilder,
    private nendoService:NendoroidService,
    private modalNendo:AlertModalNendoService
  ){}

  ngOnInit(){
    let nendo = this.route.snapshot.data['nendoroid']
    console.log(nendo)

    this.fmGroup = this.formBuilder.group({
      id:[nendo.id],
      franchise:[nendo.franchise,[Validators.required,Validators.minLength(3), Validators.maxLength(30)]],
      character:[nendo.character,[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    })
  }

  submeter(){
    this.submetido = true
    console.log(this.fmGroup.value)
    if(this.fmGroup.valid){
      let msgSuccess = 'Nendoroid adicionado'
      let msgFail = 'Falha em adicionar o nendoroid'
      if(this.fmGroup.value.id){
        let msgSuccess = 'Nendoroid atualizado'
        let msgFail = 'Falha em atualizar o nendoroid'
      }
      console.log(this.fmGroup.value)
      this.nendoService.salvar(this.fmGroup.value).subscribe(
        success=>{
          this.modalNendo.mostrarAlertaSucesso(msgSuccess)
          this.location.back()
        },
        error=>{
          this.modalNendo.mostrarAlertaFalhou(msgFail)
          //this.location.back()
        }
      )
    }
  }

  cancelar(){
    this.submetido = false
    //this.fmGroup.reset()
    this.location.back()
  }

  temErro(campo:any){
    return this.fmGroup.get(campo)?.errors
  }
}

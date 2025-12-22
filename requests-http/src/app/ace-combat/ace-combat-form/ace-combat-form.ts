import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AceCombatService } from '../ace-combat.service';
import { AlertModalAceCombatService } from '../../shared/alert-modal-ace-combat.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ace-combat-form',
  standalone: false,
  templateUrl: './ace-combat-form.html',
  styleUrl: './ace-combat-form.scss',
})
export class AceCombatForm {
  formGroup!: FormGroup
  submetido:boolean = false

  constructor(
    private route:ActivatedRoute,
    private location: Location,
    private formBuilder:FormBuilder,
    private aceCombatService:AceCombatService,
    private aceCombatModalService: AlertModalAceCombatService

  ){}

  ngOnInit(){
    let aceCombat = this.route.snapshot.data['aceCombat']
    console.log(aceCombat)

    this.formGroup = this.formBuilder.group({
      id:[aceCombat.id],
      titulo:[aceCombat.titulo,[Validators.required, Validators.minLength(3),Validators.maxLength(35)]],
      ano:[aceCombat.ano,[Validators.required,Validators.minLength(4), Validators.maxLength(4)]]
    })
  }

  submeter(){
    this.submetido = true
    if(this.formGroup.valid){
      let mensagemSucesso = 'Jogo da série Ace Combat adicionado!'
      let mensagemErro = 'Não foi possível adicionar este Ace Combat!'
      if(this.formGroup.value.id){
        let mensagemSucesso = 'Jogo da série Ace Combat atualizado!'
        let mensagemErro = 'Não foi possível atualizar este Ace Combat!'
      }
      console.log(this.formGroup.value)
      this.aceCombatService.criar(this.formGroup.value).subscribe(
        sucesso=>{
          this.aceCombatModalService.mostrarAlertaSucesso(mensagemSucesso)
          this.location.back()
        },
        erro=>{
          this.aceCombatModalService.mostrarAlertaFracasso(mensagemErro)
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

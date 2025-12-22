import { Component, OnInit } from '@angular/core';
import { EnviarValor } from '../enviar-valor';

@Component({
  selector: 'app-unsubscribe-poc',
  standalone:false,
  templateUrl: './unsubscribe-poc.component.html',
  styleUrls: ['./unsubscribe-poc.component.css']
})
export class UnsubscribePocComponent  {

  mostrarComponentes = true;

  constructor(private service: EnviarValor) { }


  ngOnInit() {
  }


  emitirValor(valor: string) {
    this.service.emitirValor(valor);
  }

  destruirComponentes() {
    this.mostrarComponentes = !this.mostrarComponentes;
  }





}

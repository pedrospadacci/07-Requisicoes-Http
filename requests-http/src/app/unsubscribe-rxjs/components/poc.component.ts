import { Component, OnInit, OnDestroy } from '@angular/core';

import { tap } from 'rxjs/operators';
import { EnviarValor } from '../enviar-valor';

@Component({
  selector: 'app-poc',
  standalone:false,
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-danger">
    </app-poc-base>
  `
})
export class PocComponent  {

  nome = 'Componente sem unsubscribe';
  valor!: string;

  constructor(private service: EnviarValor) { }

  ngOnInit() {
    this.service.getValor()
      .pipe(tap(v => console.log(this.nome, v)))
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    console.log(`${this.nome} foi destruido`);
  }

}

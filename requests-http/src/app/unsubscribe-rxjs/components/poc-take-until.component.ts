import { EnviarValor } from './../enviar-valor';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-poc-take-until',
  standalone:false,
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-primary">
    </app-poc-base>
  `
})
export class PocTakeUntil {

  nome = 'Componente com takeUntil';
  valor!: string;

  unsub$ = new Subject<void>();

  constructor(private service: EnviarValor) {}

  ngOnInit() {
    this.service.getValor()
      .pipe(
        tap(v => console.log(this.nome, v)),
        takeUntil(this.unsub$)
      )
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
    console.log(`${this.nome} foi destruido`);
  }
}

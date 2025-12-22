import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poc-base',
  standalone:false,
  templateUrl: './poc-base.component.html',
  styleUrls: ['./poc-base.component.scss']
})
export class PocBaseComponent{

   @Input() nome!: string;
   @Input() valor!: any;
   @Input() estilo!: string;


  constructor() { }

  ngOnInit() {
  }

}

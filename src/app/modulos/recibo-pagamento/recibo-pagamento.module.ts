import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReciboPagamentoRoutingModule } from './recibo-pagamento-routing.module';
import { ReciboPagamentoListComponent } from './recibo-pagamento-list/recibo-pagamento-list.component';


@NgModule({
  declarations: [ReciboPagamentoListComponent],
  imports: [
    CommonModule,
    ReciboPagamentoRoutingModule
  ]
})
export class ReciboPagamentoModule { }

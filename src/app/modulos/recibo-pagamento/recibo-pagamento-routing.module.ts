import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReciboPagamentoListComponent } from './recibo-pagamento-list/recibo-pagamento-list.component';

const routes: Routes = [
  { path: 'recibo', component: ReciboPagamentoListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReciboPagamentoRoutingModule { }

import { RelatorioFinanceiraFormListComponent } from './relatorio-financeira-form-list/relatorio-financeira-form-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", component: RelatorioFinanceiraFormListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioFinanceiroRoutingModule { }

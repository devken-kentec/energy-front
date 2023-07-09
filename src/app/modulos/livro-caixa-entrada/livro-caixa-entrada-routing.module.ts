import { LivroCaixaEntradaListComponent } from './livro-caixa-entrada-list/livro-caixa-entrada-list.component';
import { LivroCaixaEntradaFormComponent } from './livro-caixa-entrada-form/livro-caixa-entrada-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LivroCaixaEntradaFormComponent },
  { path: 'lista', component: LivroCaixaEntradaListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivroCaixaEntradaRoutingModule { }

import { FichaFinanceiraFormComponent } from './ficha-financeira-form/ficha-financeira-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FichaFinanceiraListComponent } from './ficha-financeira-list/ficha-financeira-list.component';

const routes: Routes = [
  { path: '', component: FichaFinanceiraListComponent},
  { path: 'new', component: FichaFinanceiraFormComponent},
  { path: 'editar/:id', component: FichaFinanceiraFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichaFinanceiraRoutingModule { }

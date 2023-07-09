import { SenhaListComponent } from './senha-list/senha-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SenhaFormComponent } from './senha-form/senha-form.component';

const routes: Routes = [
  { path: "", component: SenhaListComponent },
  { path: "new", component: SenhaFormComponent },
  { path: "editar/:id", component: SenhaFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SenhaRoutingModule { }

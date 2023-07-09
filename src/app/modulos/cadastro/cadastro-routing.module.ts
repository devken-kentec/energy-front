import { CadastroFormComponent } from './cadastro-form/cadastro-form.component';
import { CadastroListComponent } from './cadastro-list/cadastro-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CadastroListComponent},
  { path: 'new', component: CadastroFormComponent},
  { path: 'editar/:id', component: CadastroFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }

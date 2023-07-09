import { ExercicioImagemComponent } from './exercicio-imagem/exercicio-imagem.component';
import { ExercicioListComponent } from './exercicio-list/exercicio-list.component';
import { ExercicioFormComponent } from './exercicio-form/exercicio-form.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ExercicioListComponent},
  { path: 'new', component: ExercicioFormComponent},
  { path: 'editar/:id', component: ExercicioFormComponent},
  { path: 'exercicioimagem/:id', component: ExercicioImagemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercicioRoutingModule { }

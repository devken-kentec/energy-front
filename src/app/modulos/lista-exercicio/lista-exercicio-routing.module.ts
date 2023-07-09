import { ListaExercicioFormComponent } from './lista-exercicio-form/lista-exercicio-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: 'new/:id', component: ListaExercicioFormComponent},
  { path: 'editar/:id', component: ListaExercicioFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaExercicioRoutingModule { }

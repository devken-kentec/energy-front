import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaExercicioRoutingModule } from './lista-exercicio-routing.module';
import { ListaExercicioFormComponent } from './lista-exercicio-form/lista-exercicio-form.component';


@NgModule({
  declarations: [ListaExercicioFormComponent],
  imports: [
    CommonModule,
    ListaExercicioRoutingModule,
    ReactiveFormsModule
  ]
})
export class ListaExercicioModule { }

import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercicioRoutingModule } from './exercicio-routing.module';
import { ExercicioListComponent } from './exercicio-list/exercicio-list.component';
import { ExercicioFormComponent } from './exercicio-form/exercicio-form.component';
import { ExercicioImagemComponent } from './exercicio-imagem/exercicio-imagem.component';


@NgModule({
  declarations: [ExercicioListComponent, ExercicioFormComponent, ExercicioImagemComponent],
  imports: [
    CommonModule,
    ExercicioRoutingModule,
    ReactiveFormsModule
  ]
})
export class ExercicioModule { }

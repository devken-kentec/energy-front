import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioExerciciosRoutingModule } from './relatorio-exercicios-routing.module';
import { RelatorioExerciciosFormComponent } from './relatorio-exercicios-form/relatorio-exercicios-form.component';
import { RelatorioExerciciosListComponent } from './relatorio-exercicios-list/relatorio-exercicios-list.component';
import { RelatorioExerciciosConfComponent } from './relatorio-exercicios-conf/relatorio-exercicios-conf.component';


@NgModule({
  declarations: [RelatorioExerciciosFormComponent, RelatorioExerciciosListComponent, RelatorioExerciciosConfComponent],
  imports: [
    CommonModule,
    RelatorioExerciciosRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class RelatorioExerciciosModule { }

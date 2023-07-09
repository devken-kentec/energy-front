import { RelatorioExerciciosListComponent } from './relatorio-exercicios-list/relatorio-exercicios-list.component';
import { RelatorioExerciciosFormComponent } from './relatorio-exercicios-form/relatorio-exercicios-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelatorioExerciciosConfComponent } from './relatorio-exercicios-conf/relatorio-exercicios-conf.component';

const routes: Routes = [
  { path: 'buscar/:id/:dia', component: RelatorioExerciciosFormComponent},
  { path: 'listarexercicios', component: RelatorioExerciciosListComponent},
  { path: 'conferenciaexercicios', component: RelatorioExerciciosConfComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioExerciciosRoutingModule { }

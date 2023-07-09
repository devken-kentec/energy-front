import { FrequenciaDiaComponent } from './frequencia-dia/frequencia-dia.component';
import { FrequenciaListComponent } from './frequencia-list/frequencia-list.component';
import { FrequenciaFormComponent } from './frequencia-form/frequencia-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrequenciaConfComponent } from './frequencia-conf/frequencia-conf.component';

const routes: Routes = [
  { path: '', component: FrequenciaFormComponent },
  { path: 'listar', component: FrequenciaListComponent },
  { path: 'conferencia', component: FrequenciaConfComponent },
  { path: 'dia', component: FrequenciaDiaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrequenciaRoutingModule { }

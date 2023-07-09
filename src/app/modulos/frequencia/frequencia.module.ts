import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrequenciaRoutingModule } from './frequencia-routing.module';
import { FrequenciaFormComponent } from './frequencia-form/frequencia-form.component';
import { FrequenciaListComponent } from './frequencia-list/frequencia-list.component';
import { FrequenciaConfComponent } from './frequencia-conf/frequencia-conf.component';
import { FrequenciaDiaComponent } from './frequencia-dia/frequencia-dia.component';


@NgModule({
  declarations: [FrequenciaFormComponent, FrequenciaListComponent, FrequenciaConfComponent, FrequenciaDiaComponent],
  imports: [
    CommonModule,
    FrequenciaRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class FrequenciaModule { }

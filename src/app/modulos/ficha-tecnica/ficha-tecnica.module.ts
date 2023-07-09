import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaTecnicaRoutingModule } from './ficha-tecnica-routing.module';
import { FichaTecnicaListComponent } from './ficha-tecnica-list/ficha-tecnica-list.component';
import { FichaTecnicaFormComponent } from './ficha-tecnica-form/ficha-tecnica-form.component';


@NgModule({
  declarations: [FichaTecnicaListComponent, FichaTecnicaFormComponent],
  imports: [
    CommonModule,
    FichaTecnicaRoutingModule,
    ReactiveFormsModule
  ]
})
export class FichaTecnicaModule { }

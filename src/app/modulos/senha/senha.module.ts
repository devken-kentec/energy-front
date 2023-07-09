import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SenhaRoutingModule } from './senha-routing.module';
import { SenhaFormComponent } from './senha-form/senha-form.component';
import { SenhaListComponent } from './senha-list/senha-list.component';

import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [SenhaFormComponent, SenhaListComponent],
  imports: [
    CommonModule,
    SenhaRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ]
})
export class SenhaModule { }

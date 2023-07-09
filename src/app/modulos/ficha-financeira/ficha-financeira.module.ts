import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaFinanceiraRoutingModule } from './ficha-financeira-routing.module';
import { FichaFinanceiraListComponent } from './ficha-financeira-list/ficha-financeira-list.component';
import { FichaFinanceiraFormComponent } from './ficha-financeira-form/ficha-financeira-form.component';

import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [FichaFinanceiraListComponent, FichaFinanceiraFormComponent],
  imports: [
    CommonModule,
    FichaFinanceiraRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ]
})
export class FichaFinanceiraModule { }

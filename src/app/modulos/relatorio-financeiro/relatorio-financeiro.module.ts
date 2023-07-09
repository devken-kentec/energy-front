import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioFinanceiroRoutingModule } from './relatorio-financeiro-routing.module';
import { RelatorioFinanceiraFormListComponent } from './relatorio-financeira-form-list/relatorio-financeira-form-list.component';


@NgModule({
  declarations: [RelatorioFinanceiraFormListComponent],
  imports: [
    CommonModule,
    RelatorioFinanceiroRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class RelatorioFinanceiroModule { }

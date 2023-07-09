import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivroCaixaEntradaRoutingModule } from './livro-caixa-entrada-routing.module';
import { LivroCaixaEntradaFormComponent } from './livro-caixa-entrada-form/livro-caixa-entrada-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { LivroCaixaEntradaListComponent } from './livro-caixa-entrada-list/livro-caixa-entrada-list.component';


@NgModule({
  declarations: [LivroCaixaEntradaFormComponent, LivroCaixaEntradaListComponent],
  imports: [
    CommonModule,
    LivroCaixaEntradaRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ]
})
export class LivroCaixaEntradaModule { }

import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroListComponent } from './cadastro-list/cadastro-list.component';
import { CadastroFormComponent } from './cadastro-form/cadastro-form.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [CadastroListComponent, CadastroFormComponent],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ]
})
export class CadastroModule { }

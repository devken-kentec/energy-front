import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuAlunoRoutingModule } from './menu-aluno-routing.module';
import { MenuAlunoFormComponent } from './menu-aluno-form/menu-aluno-form.component';


@NgModule({
  declarations: [MenuAlunoFormComponent],
  imports: [
    CommonModule,
    MenuAlunoRoutingModule
  ]
})
export class MenuAlunoModule { }

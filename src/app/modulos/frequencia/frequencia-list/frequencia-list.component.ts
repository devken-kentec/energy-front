import { CadastroService } from './../../cadastro/shared/cadastro.service';
import { FrequenciaService } from './../shared/frequencia.service';
import { GlobalService } from './../../shared/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Frequencia } from '../shared/frequencia';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frequencia-list',
  templateUrl: './frequencia-list.component.html',
  styleUrls: ['./frequencia-list.component.css']
})
export class FrequenciaListComponent implements OnInit {

  frequenciaForm: FormGroup;
  mostrar: boolean = false;
  nome: string;
  frequencias: Frequencia[];

  constructor(private fb: FormBuilder,
              private globalService: GlobalService,
              private frequenciaService: FrequenciaService,
              private cadastroService: CadastroService,
              private router: Router){ }

  ngOnInit(): void {

    this.frequenciaForm = this.fb.group({
      alunoId: ['',[]],
      dataInicial: ['',[]],
      dataFinal: ['', []]
    });

    this.frequenciaForm.get("alunoId").setValue(this.globalService.getId());
  }

  buscarUsuario(){

    let alunoId = this.frequenciaForm.get("alunoId").value;
    let dataInicial = this.frequenciaForm.get("dataInicial").value;
    let dataFinal = this.frequenciaForm.get("dataFinal").value;

    if(this.frequenciaForm.valid){
      this.frequenciaService.findByFrequenciaDataAluno(alunoId, dataInicial, dataFinal).subscribe((dados: any)=>{
          this.frequencias = dados,
          this.cadastroService.loadById(alunoId).subscribe((res:any)=>{ this.nome = res.nome }),
          this.mostrar = true
      }, error =>{ this.globalService.warningShow("Informe o periodo","Lista de frequência")});
    }
  }

  voltar(){
    let tipo = this.globalService.getTipo();
    if(tipo == "Aluno"){
      this.router.navigate(["/menualuno"]);
    } else {
      this.router.navigate(["/"]);
    }
  }

}

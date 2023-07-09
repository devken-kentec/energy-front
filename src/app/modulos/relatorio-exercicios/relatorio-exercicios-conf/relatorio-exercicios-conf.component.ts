import { CadastroService } from './../../cadastro/shared/cadastro.service';
import { RelatorioExerciciosService } from './../shared/relatorio-exercicios.service';
import { Exercicios } from './../shared/exercicos';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-exercicios-conf',
  templateUrl: './relatorio-exercicios-conf.component.html',
  styleUrls: ['./relatorio-exercicios-conf.component.css']
})
export class RelatorioExerciciosConfComponent implements OnInit {

  exerciciosForm: FormGroup
  mostrar: boolean = false;
  exercicios: Exercicios[];
  nome: string;

  constructor(private fb: FormBuilder,
              private relatorioExercicioService: RelatorioExerciciosService,
              private cadastroService: CadastroService) { }

  ngOnInit(): void {

    this.exerciciosForm = this.fb.group({
      alunoId: ['',[]],
      diaTreino: ['',[]]
    });

  }

  buscarExercicioUsuario(){

    let diaTreino = this.exerciciosForm.get("diaTreino").value;
    let alunoId = this.exerciciosForm.get("alunoId").value;

    this.relatorioExercicioService.loadByExercicioDia(diaTreino, alunoId).subscribe((dados:any)=>{
        this.exercicios = dados,
        this.mostrar = true,
        this.cadastroService.loadById(alunoId).subscribe((res:any)=>{this.nome = res.nome})
    });
  }

}

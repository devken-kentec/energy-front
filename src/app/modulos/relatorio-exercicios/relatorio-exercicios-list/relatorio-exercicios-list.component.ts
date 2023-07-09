import { ExercicioService } from './../../exercicio/shared/exercicio.service';
import { ExercicioImagem } from './../../exercicio/shared/exercicio-imagem';
import { CadastroService } from './../../cadastro/shared/cadastro.service';
import { Exercicios } from './../shared/exercicos';
import { RelatorioExerciciosService } from './../shared/relatorio-exercicios.service';
import { GlobalService } from './../../shared/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-relatorio-exercicios-list',
  templateUrl: './relatorio-exercicios-list.component.html',
  styleUrls: ['./relatorio-exercicios-list.component.css']
})
export class RelatorioExerciciosListComponent implements OnInit {

  exerciciosForm: FormGroup;
  mostrar: boolean = false;
  exercicios: Exercicios[] = [];
  exerciciosImg: ExercicioImagem[] = [];
  nome: string;
  render: SafeResourceUrl;


  constructor(private fb: FormBuilder,
              private globalService: GlobalService,
              private relatorioExercicioService: RelatorioExerciciosService,
              private cadastroService: CadastroService,
              private router: Router,
              private exercicioService: ExercicioService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.exerciciosForm = this.fb.group({
      alunoId: ['',[]],
      diaTreino: ['',[]]
    });

    this.exerciciosForm.get("alunoId").setValue(this.globalService.getId());
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

  voltar(){
    let tipo = this.globalService.getTipo();

    if(tipo == "Aluno"){
      this.router.navigate(["/menualuno"]);
    } else {
      this.router.navigate(["/"]);
    }
  }

  mostrarImg(id: number){
    this.exercicioService.loadAllExercicioImg(id).subscribe(
      res => this.exerciciosImg = res
    );
  }

  renderUrl(url: string){
    this.render = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${url}`)
    return this.render;
  }
}

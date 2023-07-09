import { GlobalService } from './../../shared/global.service';
import { ExercicioImagem } from './../../exercicio/shared/exercicio-imagem';
import { ExercicioService } from './../../exercicio/shared/exercicio.service';
import { FichaTecnicaService } from './../../ficha-tecnica/shared/ficha-tecnica.service';
import { FichaFinanceiraService } from './../../ficha-financeira/shared/ficha-financeira.service';
import { RelatorioExerciciosService } from './../shared/relatorio-exercicios.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercicios } from '../shared/exercicos';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-relatorio-exercicios-form',
  templateUrl: './relatorio-exercicios-form.component.html',
  styleUrls: ['./relatorio-exercicios-form.component.css']
})
export class RelatorioExerciciosFormComponent implements OnInit {

  fichaTecnica: string = '';
  aluno: string = '';
  vencimento: number;
  dataAvaliacao: string = '';
  statusFichaTecnica: string = '';
  exers: Exercicios[] = [];
  exerciciosImg: ExercicioImagem[] = [];
  hoje: string = '';
  render: SafeResourceUrl;

  constructor(private route: ActivatedRoute,
              private relatorioExercicioService: RelatorioExerciciosService,
              private fichaTecnicaService: FichaTecnicaService,
              private fichaFinanceiraService: FichaFinanceiraService,
              private exercicioService: ExercicioService,
              private sanitizer: DomSanitizer,
              private globalService: GlobalService,
              private router: Router ) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.params;
    this.hoje = routeParams.dia;
    this.buscarFichaTecnica(routeParams.id, routeParams.dia);
    this.buscarDiaVencimento(routeParams.id);
  }

  buscarFichaTecnica(id, dia){
      this.fichaTecnicaService.loadByFichaTecnicaAluno(id).subscribe((relatorio: any)=>{
        this.fichaTecnica = relatorio.id;
        this.aluno = relatorio.aluno;
        this.dataAvaliacao = relatorio.dataAvaliacao;
        this.statusFichaTecnica = relatorio.statusFichaTecnica;

        this.buscarListaExercicioDia(dia, this.fichaTecnica);
      });
  }

  buscarListaExercicioDia(diaSemana, fichaTecnicaId){
    this.relatorioExercicioService.loadByFichaTecnicaDia(diaSemana, fichaTecnicaId).subscribe(
          dados => this.exers = dados
    );
  }

  buscarDiaVencimento(alunoId){
    this.fichaFinanceiraService.findByAlunoId(alunoId).subscribe((dados:any)=>{
      this.vencimento = dados.diaVencimento;
    });
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

  voltar(){
    let tipo = this.globalService.getTipo();

    if(tipo == "Aluno"){
      this.router.navigate(["/menualuno"]);
    } else {
      this.router.navigate(["/"]);
    }
  }
}

import { GlobalService } from './../../shared/global.service';
import { ExercicioService } from './../shared/exercicio.service';
import { Exercicio } from './../shared/exercicio';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-exercicio-list',
  templateUrl: './exercicio-list.component.html',
  styleUrls: ['./exercicio-list.component.css'],
  preserveWhitespaces: true
})
export class ExercicioListComponent implements OnInit {

  exercicios: Exercicio[];
  _nome: string = "";
  _id: string = "";
  totalElements = 0;
  totalPages = 0;
  pagina = 0;
  tamanho = 5;
  paginaForm: FormGroup;
  exerListForm = this.fb.group({
    nome: ['',[]]
  });

  constructor(private exercicioService: ExercicioService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarExercicioPaginado(this.pagina, this.tamanho);
    this.paginaForm = this.fb.group({
      quantPag: [ 5 ]
    });
  }

  findByAll(){
    this.exercicioService.loadAll().subscribe(
      res => this.exercicios = res
    );
  }

  onEdit(id){
    this.router.navigate(["editar", id], {relativeTo: this.route});
  }

  onDelete(){
    this.exercicioService.remove(this._id).subscribe(
      success=>{this.globalService.removeShow("Inativado com sucesso!", this._nome)},
      error=>{console.log("Erro ao excluir!!")},
      ()=> this.findByAll()
    );
  }

  onClose(){
    this.findByAll();
  }

  pegarDados(id, nome){
      this._id = id;
      this._nome = nome;
  }

  listarExercicioPaginado(page, size){
    this.exercicioService.listExercicioPaginado(page, size).subscribe(
          response => { this.exercicios = response.content;
                        this.totalElements = response.totalElements;
                        this.totalPages = response.totalPages;
                        }
    );
  }

  paginaMenor(){
    if(this.pagina <= 0){
      this.pagina = 0;
    } else {
      this.pagina = this.pagina - 1;
    }
     return this.listarExercicioPaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

  paginaMaior(){
    this.pagina = this.pagina + 1;
    return this.listarExercicioPaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

  atualizaPagina(){
    this.pagina = 0
    return this.listarExercicioPaginado(this.pagina, this.paginaForm.get('quantPag').value);
  }

  buscarExercicio(){
    let nome = this.exerListForm.value.nome;

    this.exercicioService.loadByExercicioNome(nome).subscribe(
      res => this.exercicios = res
    );
  }
}

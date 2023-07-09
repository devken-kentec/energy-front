import { GlobalService } from './../../shared/global.service';
import { ListaExercicioService } from './../shared/lista-exercicio.service';
import { ExercicioService } from './../../exercicio/shared/exercicio.service';
import { FichaTecnicaService } from './../../ficha-tecnica/shared/ficha-tecnica.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercicio } from '../../exercicio/shared/exercicio';
import { ListaExercicio } from '../shared/lista-exercicio';

@Component({
  selector: 'app-lista-exercicio-form',
  templateUrl: './lista-exercicio-form.component.html',
  styleUrls: ['./lista-exercicio-form.component.css']
})
export class ListaExercicioFormComponent implements OnInit {

  listExerForm: FormGroup;
  seg: string;
  ter: string;
  qua: string;
  qui: string;
  sex: string;
  sab: string;
  exercicios: Exercicio[];
  listaExercicios: ListaExercicio[];
  codExer: string = "";
  nomeExer: string = "";
  nivelExer: string = "";
  tipoExer: string = "";
  funcaoExer: string = "";
  modExer: string ="";
  ft: number;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private fichaTecnicaService: FichaTecnicaService,
              private exercicioService: ExercicioService,
              private listaExercicioService: ListaExercicioService,
              public globalService: GlobalService
              ) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.params;
    this.ft = routeParams.id;
    this.loadByFichaTecnica(this.ft);
    this.loadByExercicioFichaTecnica(this.ft);
    this.loadByExercicio();


    this.listExerForm = this.fb.group({
      id:['',[]],
      dataAvaliacao: ['',[]],
      cadastro: this.fb.group({
        login:['',[]],
        nome:['',[]],
      }),
      segunda: ['',[]],
      terca: ['',[]],
      quarta: ['',[]],
      quinta: ['',[]],
      sexta: ['',[]],
      sabado: ['',[]],
      diaTreino: ['',[]],
      exercicioId: ['',[]],
      fichaTecnicaId: ['',[]],
      statusLista: ['',[]]
  });
  }

  loadByFichaTecnica(id){
    if(id != null){
      this.fichaTecnicaService.loadById(id).subscribe((fichaTecnica: any)=>{
        this.updateListExerform(fichaTecnica)

        this.seg = this.listExerForm.get('segunda').value;
        this.ter = this.listExerForm.get('terca').value;
        this.qua = this.listExerForm.get('quarta').value;
        this.qui = this.listExerForm.get('quinta').value;
        this.sex = this.listExerForm.get('sexta').value;
        this.sab = this.listExerForm.get('sabado').value;

      });
    }
  }

  updateListExerform(fichaTecnica){
    this.listExerForm.patchValue(fichaTecnica);
  }

  loadByExercicio(){
    this.exercicioService.loadAll().subscribe((dados: any)=>{
      this.exercicios = dados
    });
  }

  loadByExercicioFichaTecnica(fichaTecnicaId){
    this.listaExercicioService.findByListarExercicioFichaTecnica(fichaTecnicaId).subscribe(
      dados => this.listaExercicios = dados
    );
  }

  conferirExercicio(){
    let tipoExer = this.listExerForm.get("exercicioId").value;

    this.exercicioService.loadById(tipoExer).subscribe((exercicio: any)=>{
      this.codExer = exercicio.id,
      this.nomeExer = exercicio.nome,
      this.nivelExer = exercicio.nivel,
      this.tipoExer = exercicio.tipo,
      this.funcaoExer = exercicio.funcao,
      this.modExer = exercicio.modalidade
    });
  }

  onBeforeSave(){

    let transf =  this.listExerForm.get("id").value;
    this.listExerForm.get("fichaTecnicaId").setValue(transf.toString());
    this.listExerForm.get("id").disable();
    this.listExerForm.get("cadastro").disable();
    this.listExerForm.get("dataAvaliacao").disable();
    this.listExerForm.get("segunda").disable();
    this.listExerForm.get("terca").disable();
    this.listExerForm.get("quarta").disable();
    this.listExerForm.get("quinta").disable();
    this.listExerForm.get("sexta").disable();
    this.listExerForm.get("sabado").disable();
    this.listExerForm.get("statusLista").setValue("Ativo");
  }
  onSubmit(){
    this.onBeforeSave()
    this.listaExercicioService.create(this.listExerForm.value).subscribe(
      success => { this.globalService.saveShow("Incluido com Sucesso!", "Exercicio")}
    );
  }

  mudarCor(diaSemana: string){
    return diaSemana == "Sim"? 'blue': 'green';
  }

  close(){
    this.loadByExercicioFichaTecnica(this.ft);
    this.listExerForm.get("exercicioId").reset();
  }

  onDelete(id){

    this.listaExercicioService.remove(id).subscribe(
      success => {
        this.globalService.removeShow("Removido com Sucesso!", "Exercicio")
        this.loadByExercicioFichaTecnica(this.ft);
    });

  }

}

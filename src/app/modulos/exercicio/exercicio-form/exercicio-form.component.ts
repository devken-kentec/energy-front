import { GlobalService } from './../../shared/global.service';
import { ExercicioService } from './../shared/exercicio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exercicio-form',
  templateUrl: './exercicio-form.component.html',
  styleUrls: ['./exercicio-form.component.css']
})
export class ExercicioFormComponent implements OnInit {

  exerForm: FormGroup;
  mostrarBtnImg: boolean = false;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private exercicioService: ExercicioService,
              private globalService: GlobalService,
              private router: Router) { }


  ngOnInit(): void {

    const routeParams = this.route.snapshot.params;
    this.findById(routeParams.id);

    this.exerForm = this.fb.group({
      id: ['',[]],
      nome: ['',[]],
      nivel: ['',[]],
      tipo: ['',[]],
      funcao: ['',[]],
      execucao:['',[]],
      detalhe:['',[]],
      descricao: ['',[]],
      modalidade: ['',[]],
      statusExercicio: ['',[]]
    });

  }
  updateExerForm(exercicio){
    this.exerForm.patchValue(exercicio);
  }

  findById(id){
    if(id != null){
      this.exercicioService.loadById(id).subscribe((dados: any)=>{
          this.updateExerForm(dados);
          this.mostrarBtnImg = true;
      });
    }
  }

  onSumit(){
    let exercicio = this.exerForm.get('nome').value;
      if(this.exerForm.valid){
        this.exercicioService.save(this.exerForm.value).subscribe(
          success =>{ this.globalService.saveShow("Salvo com sucesso!", exercicio) }
        );
      }
      this.exerForm.reset();
  }

  incluirImg(){
    let id = this.exerForm.value.id;
    this.router.navigate(["/exercicio/exercicioimagem", id], {relativeTo: this.route});
  }
}

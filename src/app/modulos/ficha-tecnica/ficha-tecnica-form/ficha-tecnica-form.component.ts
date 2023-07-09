import { GlobalService } from './../../shared/global.service';
import { FichaTecnicaService } from './../shared/ficha-tecnica.service';
import { CadastroService } from './../../cadastro/shared/cadastro.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ficha-tecnica-form',
  templateUrl: './ficha-tecnica-form.component.html',
  styleUrls: ['./ficha-tecnica-form.component.css']
})
export class FichaTecnicaFormComponent implements OnInit {

  mostrar: boolean = false;
  fichaTecnicaForm: FormGroup;
  id: string = '';
  id_fic_tec: string = '';
  nomeAluno: string = '';
  mostrarMens: boolean = false;
  mostBtnExer: boolean = false;

  constructor(private fb: FormBuilder,
              private cadastroService: CadastroService,
              private fichaTenicaService: FichaTecnicaService,
              private globalService: GlobalService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.params;

    this.loadById(routeParams.id);

    this.fichaTecnicaForm = this.fb.group({
      matricula: ['',[]],
      id: ['',[]],
      dataAvaliacao: ['',[]],
      peso: ['',[]],
      horaEntrada: ['',[]],
      horaSaida: ['',[]],
      segunda: ['',[]],
      terca: ['',[]],
      quarta: ['',[]],
      quinta: ['',[]],
      sexta: ['',[]],
      sabado: ['',[]],
      descricao: ['',[]],
      statusFichaTecnica: ['',[]],
      alunoId: ['',[]]
    });
  }

  loadById(id){
    if(id != null){
      this.fichaTenicaService.loadById(id).subscribe((fichaTecnica: any)=>{
        this.updateFicTecForm(fichaTecnica);
        this.fichaTecnicaForm.get('matricula').setValue(fichaTecnica.cadastro.id);
        this.id_fic_tec = this.fichaTecnicaForm.get('id').value;
        this.nomeAluno = fichaTecnica.cadastro.nome;
        this.fichaTecnicaForm.get('alunoId').setValue(fichaTecnica.cadastro.id);
        this.mostrar = true;
        this.mostBtnExer = true;
      });
    }
  }

  updateFicTecForm(fichaTecnica){
    this.fichaTecnicaForm.patchValue(fichaTecnica);
  }

  incluirUser(){
    this.cadastroService.loadById(this.fichaTecnicaForm.get('matricula').value).subscribe((aluno: any)=>{
        this.nomeAluno = aluno.nome;
        this.mostrar = true;
        this.fichaTecnicaForm.get('alunoId').setValue(aluno.id);
    });
  }

  onSubmit(){
    this.fichaTecnicaForm.get("matricula").disable();
    if(this.fichaTecnicaForm.valid){
      this.fichaTenicaService.save(this.fichaTecnicaForm.value).subscribe(
        success => {this.globalService.saveShow("Salvo com Sucesso!", "Ficha Tecnica")}
      );
    }
    this.fichaTecnicaForm.reset();
    this.fichaTecnicaForm.get("matricula").enable();
    this.mostrar = false;
  }

  incluirExer(){
    let id = this.fichaTecnicaForm.get("id").value;
    this.router.navigate(["/listaexercicio/new", id], {relativeTo: this.route});
  }
}

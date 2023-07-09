import { GlobalService } from './../../shared/global.service';
import { FrequenciaService } from './../shared/frequencia.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CadastroService } from './../../cadastro/shared/cadastro.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frequencia-form',
  templateUrl: './frequencia-form.component.html',
  styleUrls: ['./frequencia-form.component.css']
})
export class FrequenciaFormComponent implements OnInit {

  mostrar: boolean = false;
  frequenciaForm: FormGroup;
  nome: string;
  login: string;
  data = new Date();
  dias = new Array('Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado');
  semana: string;
  hora: string;
  dataMes: string;

  constructor(private fb: FormBuilder,
              private cadastroService: CadastroService,
              private frequenciaService: FrequenciaService,
              private globalService: GlobalService,
              private router: Router) {
                this.frequenciaForm = this.fb.group({
                  alunoId: ['',[]],
                  diaSemana: ['',[]],
                  dataMes: ['',[]],
                  horaDia: ['',[]],
                  statusFrequencia: ['',[]]
              });
            }

  ngOnInit(): void {
  }

  incluirUser(){
    this.cadastroService.loadById(this.frequenciaForm.get('alunoId').value).subscribe((aluno: any)=>{
          this.nome = aluno.nome;
          this.login = aluno.login;
          this.semana = this.dias[this.data.getDay()],
          this.dataMes = this.data.getDate() + '/' + (this.data.getMonth()+1) + '/' + this.data.getFullYear(),
          this.hora = this.data.getHours() + ':' + this.data.getMinutes() + ':' + this.data.getSeconds(),
          this.mostrar = true;

          this.frequenciaForm.get("diaSemana").setValue(this.semana);
          this.frequenciaForm.get("dataMes").setValue(this.dataMes);
          this.frequenciaForm.get("horaDia").setValue(this.hora);
    });
  }


  onSubmit(){
    let id = this.frequenciaForm.get("alunoId").value;
    let diaSemana = this.frequenciaForm.get("diaSemana").value;

    if(this.frequenciaForm.valid){
      this.frequenciaService.save(this.frequenciaForm.value).subscribe(
          success =>{ this.globalService.saveShow("Registrado com Sucesso!", "Frequência"),
                      this.router.navigate(['relatorioexercicios/buscar', id, diaSemana])
         }, (error: any) => { this.globalService.warningShow("Voçê já registrou entrada e saída", "OPS!")
        })
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

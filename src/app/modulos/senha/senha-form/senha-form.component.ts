import { GlobalService } from './../../shared/global.service';
import { CadastroService } from './../../cadastro/shared/cadastro.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-senha-form',
  templateUrl: './senha-form.component.html',
  styleUrls: ['./senha-form.component.css']
})
export class SenhaFormComponent implements OnInit {

  senhaForm: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private cadastroService: CadastroService,
              private globlaService: GlobalService) { }

  ngOnInit(): void {

    const routeParans = this.route.snapshot.params;
    this.findById(routeParans.id);

    this.senhaForm = this.fb.group({
      id: ['', []],
      nome: ['', []],
      tipoUser: ['', []],
      statusMatricula: ['', []],
      login: ['', []],
      senha: ['', []]
    });
  }

  findById(id){
    if(id != null){
      this.cadastroService.loadById(id).subscribe((dados:any)=>{
        this.updateSenhaForm(dados);
      });
    }

  }

  updateSenhaForm(senha){
    this.senhaForm.patchValue(senha);
  }

  onSubmit(){
    if(this.senhaForm.valid){
      this.cadastroService.updateSenha(this.senhaForm.value).subscribe(
        success => { this.globlaService.saveShow("Alterado com Sucesso!","Senha")}
      );
    }
  }
}

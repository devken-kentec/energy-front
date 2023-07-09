import { GlobalService } from './../../shared/global.service';
import { CadastroService } from './../shared/cadastro.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.css']
})
export class CadastroFormComponent implements OnInit {

  cadForm: FormGroup;
  render: SafeResourceUrl;
  mostrarFoto: boolean = false;
  mostrarIncluirFoto: boolean = false;
  ativarResponsavel: boolean = false;
  btnIncluirResponsavel: boolean = true;


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private cadastroService: CadastroService,
              private globalService: GlobalService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.params;
    this.findById(routeParams.id);

    this.cadForm = this.fb.group({
      id: ['',[]],
      nome: ['',[]],
      responsavel: ['',[]],
      cpf: ['',],
      dataNascimento: ['',[]],
      fone: ['',[]],
      foneCel: ['',[]],
      foneCel2: ['',[]],
      cep: ['',[]],
      endereco: ['',[]],
      complemento: ['',[]],
      sexo: ['',[]],
      email: ['',[]],
      login: ['',[]],
      tipoUser: ['',[]],
      senha: ['',[]],
      statusMatricula: ['',[]],
      foto: ['', []]
    });
  }

  findById(id){
    if(id != null){
      this.cadastroService.loadById(id).subscribe((dados:any)=>{
        this.incluirFoto(dados.id, dados.foto),
        this.render = this.sanitizer.bypassSecurityTrustUrl(`data:image/*;base64,${dados.foto}`),
        this.updateCadForm(dados)
        if(dados.responsavel == ""){
          this.ativarResponsavel = true;
          this.btnIncluirResponsavel = false;
        }
    });
    }
  }

  updateCadForm(cadastro){
    this.cadForm.patchValue(cadastro);
  }

  onSumit(){
    let nome = this.cadForm.value.nome;
    if(this.cadForm.valid){
      this.cadastroService.save(this.cadForm.value).subscribe((success)=> {
        this.globalService.saveShow("Salvo com Sucesso!", nome),
        error => { this.globalService.warningShow("Este login já existe na base de dados!", "OPS!") }

      });
    }
    this.cadForm.reset()
  }

  uploadFoto(event){
    const files = event.target.files;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("arquivo", foto);
      this.cadastroService.upload(this.cadForm.value.id, formData).subscribe(
        sucess => { this.globalService.saveShow("Imagem adicionado com Sucesso!", "Cadastro")},
        (error: any) => { this.globalService.warningShow("Tamanho ou formato da imagem", "OPS!") }
      );
    }
    this.cadForm.reset();
  }

  incluirFoto(id, foto){
    if(id != null && foto == ""){
      this.mostrarFoto = false;
      this.mostrarIncluirFoto = true;
    } else if(id != null && foto != ""){
      this.mostrarFoto = true;
      this.mostrarIncluirFoto = false;
    }
  }

  adicionarNovaFoto(){
    this.mostrarIncluirFoto = true;
    this.mostrarFoto = false;
  }

  buscarCep(){
    let cep = this.cadForm.value.cep;
    this.globalService.consultaCep(cep).subscribe((dados: any)=>{

        this.cadForm.patchValue({
          endereco: dados.logradouro + " - " + dados.bairro + " - " + dados.localidade + " - " + dados.uf,
          complemento: dados.complemento });
    },
    errorResponse => { this.globalService.warningShow("Coloque o CEP por gentileza!", "OPS!")});
  }

  ativarCampo(){
    this.ativarResponsavel = !this.ativarResponsavel;
  }
}

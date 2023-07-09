import { GlobalService } from './../../shared/global.service';
import { CadastroService } from './../shared/cadastro.service';
import { Component, OnInit } from '@angular/core';
import { Cadastro } from '../shared/cadastro';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-cadastro-list',
  templateUrl: './cadastro-list.component.html',
  styleUrls: ['./cadastro-list.component.css'],
  preserveWhitespaces: true
})
export class CadastroListComponent implements OnInit {

  constructor(private cadastroService: CadastroService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService,
              private fb: FormBuilder) { }

  cadastros: Cadastro[];
  _nome: string = "";
  _id: number = null;
  totalElements = 0;
  totalPages = 0;
  pagina = 0;
  tamanho = 5;
  paginacaoForm: FormGroup;
  cadListForm = this.fb.group({
    nome: ['',[]]
  });

  ngOnInit(): void {
    this.listarCadastroPaginado(this.pagina, this.tamanho);
    this.paginacaoForm = this.fb.group({
      quantPag: [ 5 ]
    });
  }

  findByAll(){
    this.cadastroService.loadAll().subscribe(
      dados => this.cadastros = dados
    );
  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onClose(){
    this.findByAll();
  }

  pegarDados(id, nome){
    this._id = id;
    this._nome = nome;
  }

  onDelete(){
    this.cadastroService.remove(this._id).subscribe(
      success=>{this.globalService.removeShow("Inativado com Sucesso", this._nome)},
      error=>{console.log("Erro ao excluir!!")},
      ()=> this.findByAll()
    );
  }

  listarCadastroPaginado(page, size){
    this.cadastroService.listCadastroPaginado(page, size).subscribe(
          response => { this.cadastros = response.content;
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
     return this.listarCadastroPaginado(this.pagina, this.paginacaoForm.get('quantPag').value);
  }

  paginaMaior(){
    this.pagina = this.pagina + 1;
    return this.listarCadastroPaginado(this.pagina, this.paginacaoForm.get('quantPag').value);
  }

  atualizaPagina(){
    this.pagina = 0
    return this.listarCadastroPaginado(this.pagina, this.paginacaoForm.get('quantPag').value);
  }

  buscarPessoa() {
    let nome = this.cadListForm.value.nome;
    this.cadastroService.loadByNome(nome).subscribe(
      res => this.cadastros = res
    );
  }

  vincularWhatsApp(whatsapp: string){
    let chamar = "https://wa.me/550"+whatsapp+"?text=Aqui é do Espaço Vivah! Tudo bem?";
    return chamar;
  }
}

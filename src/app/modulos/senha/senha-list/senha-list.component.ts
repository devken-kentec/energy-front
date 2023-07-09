import { CadastroService } from './../../cadastro/shared/cadastro.service';
import { Component, OnInit } from '@angular/core';
import { Cadastro } from '../../cadastro/shared/cadastro';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-senha-list',
  templateUrl: './senha-list.component.html',
  styleUrls: ['./senha-list.component.css']
})
export class SenhaListComponent implements OnInit {

  cadastros: Cadastro[];
  totalElements = 0;
  totalPages = 0;
  pagina = 0;
  tamanho = 5;
  paginacaoForm: FormGroup;
  cadListForm = this.fb.group({
    nome: ['',[]]
  });

  constructor(private cadastroService: CadastroService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

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
    this.router.navigate(["editar", id], {relativeTo: this.route})
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

}

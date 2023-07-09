import { GlobalService } from './../../shared/global.service';
import { LivroCaixaEntradaService } from './../shared/livro-caixa-entrada.service';
import { CadastroService } from './../../cadastro/shared/cadastro.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cadastro } from '../../cadastro/shared/cadastro';

@Component({
  selector: 'app-livro-caixa-entrada-form',
  templateUrl: './livro-caixa-entrada-form.component.html',
  styleUrls: ['./livro-caixa-entrada-form.component.css']
})
export class LivroCaixaEntradaFormComponent implements OnInit {

  cadastros: Cadastro[] = [];
  tabela: boolean = false;
  mostrarConfirmacao: boolean = false;
  btnLancamento: boolean = true;
  livroForm = this.fb.group({
    id: ['',[]],
    nome: ['',[]],
    dataPagamento: ['',[]],
    tipoPagamento: ['',[]],
    valorRecebido: ['',[]],
    referente: ['',[]]
  });

  constructor(private fb: FormBuilder,
              private cadastroService: CadastroService,
              private livroCaixaEntradaService: LivroCaixaEntradaService,
              private globalService: GlobalService) { }

  ngOnInit(): void {
  }

  buscarPessoa(){
    let nome = this.livroForm.value.nome;
    this.cadastroService.loadByNome(nome).subscribe(
      res => this.cadastros = res
    );
    this.tabela = true;
  }

  pegarNome(nome: String){
    this.livroForm.patchValue({ nome: nome });
    this.btnLancamento = true;
  }

  onSubmit(){
    if(this.livroForm.valid){
      let recebimento = this.livroForm.value;
      this.livroCaixaEntradaService.create(recebimento).subscribe(
        success=> { this.globalService.saveShow('Realizado com Sucesso!','Recebimento'),
                    this.mostrarConfirmacao = !this.mostrarConfirmacao,
                    this.tabela = false,
                    this.btnLancamento = false}
      );
    }
  }

}

import { Parcela } from './../../ficha-financeira/shared/parcela';
import { GlobalService } from './../../shared/global.service';
import { FichaFinanceiraService } from './../../ficha-financeira/shared/ficha-financeira.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recibo-pagamento-list',
  templateUrl: './recibo-pagamento-list.component.html',
  styleUrls: ['./recibo-pagamento-list.component.css']
})
export class ReciboPagamentoListComponent implements OnInit {

  nome: string;
  cpf: string;
  login: string;
  fichaFinanceiraId: number;
  dataGeracao: number;
  diaVencimento: number;
  valorMensal: number;
  statusFichaFinanceira: string;
  parcelas: Parcela[] = [];
  constructor(private fichaFinanceiraSerice: FichaFinanceiraService,
              private globalService: GlobalService,
              private router: Router) { }

  ngOnInit(): void {
    const alunoId = this.globalService.getId();
    this.loadByFichaFinancira(alunoId);
  }

  loadByFichaFinancira(id: number){
    this.fichaFinanceiraSerice.findByAlunoId(id).subscribe((dados: any)=> {
        this.nome = dados.nome;
        this.cpf = this.globalService.formatarCpf(dados.cpf);
        this.login = dados.login;
        this.dataGeracao = dados.dataGeracao;
        this.diaVencimento = dados.diaVencimento;
        this.valorMensal = dados.valorMensal;
        this.fichaFinanceiraId = dados.fichaFinanceiraId;
        this.loadByParcela(this.fichaFinanceiraId);
    });
  }

  loadByParcela(fichaFinanceiraId: number){
    this.fichaFinanceiraSerice.findByFichaFinanceiraParcela(fichaFinanceiraId).subscribe(
      res => this.parcelas = res
    );
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

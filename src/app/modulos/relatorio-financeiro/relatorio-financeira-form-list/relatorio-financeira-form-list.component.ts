import { GlobalService } from './../../shared/global.service';
import { FichaFinanceiraService } from './../../ficha-financeira/shared/ficha-financeira.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Parcela } from '../../ficha-financeira/shared/parcela';

@Component({
  selector: 'app-relatorio-financeira-form-list',
  templateUrl: './relatorio-financeira-form-list.component.html',
  styleUrls: ['./relatorio-financeira-form-list.component.css'],
  preserveWhitespaces: true
})
export class RelatorioFinanceiraFormListComponent implements OnInit {

  relForm: FormGroup;
  parcelas: Parcela[];

  constructor(private fb: FormBuilder,
              private fichaFinanceiraService: FichaFinanceiraService,
              public globalService: GlobalService) { }

  ngOnInit(): void {

    this.relForm = this.fb.group({
        alunoId: ["",[]],
        dataInicial: ["",[]],
        dataFinal: ["",[]],
        statusParcela: ["",[]],
        tipoPagamento: ["",[]]
    });
  }

  pesquisarAluno(){

    let alunoId = this.relForm.get("alunoId").value
    let dataInicial = this.relForm.get("dataInicial").value
    let dataFinal = this.relForm.get("dataFinal").value
    let statusParcela = this.relForm.get("statusParcela").value

    this.fichaFinanceiraService.buscaAvancadaAluno(alunoId, this.primeiroDia(dataInicial), this.ultimoDia(dataFinal), statusParcela).subscribe((dados:any)=>{
        this.parcelas = dados
    });
  }

  pesquisarPeriodo(){
    let dataInicial = this.relForm.get("dataInicial").value
    let dataFinal = this.relForm.get("dataFinal").value
    let statusParcela = this.relForm.get("statusParcela").value

    this.fichaFinanceiraService.buscaAvancadaPeriodo(this.primeiroDia(dataInicial), this.ultimoDia(dataFinal), statusParcela).subscribe((dados:any)=>{
      this.parcelas = dados
    });
  }

  pesquisarTipo(){
    let dataInicial = this.relForm.get("dataInicial").value
    let dataFinal = this.relForm.get("dataFinal").value
    let tipoPagamento = this.relForm.get("tipoPagamento").value

    this.fichaFinanceiraService.buscaAvancadaTipo(this.primeiroDia(dataInicial), this.ultimoDia(dataFinal), tipoPagamento).subscribe((dados:any)=>{
      this.parcelas = dados
    });
  }

  primeiroDia(dataInicial){
    let monName = new Array ("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    let now = new Date();
    if(dataInicial == ""){
      dataInicial = now.getFullYear()+"-"+monName[now.getMonth()] + "-" + "01";
    }
    return dataInicial;
  }

  ultimoDia(dataFinal){
    let monName = new Array ("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    let endDay = new Array ("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "30");
    let now = new Date();
    if(dataFinal == ""){
      dataFinal = now.getFullYear() +"-"+monName[now.getMonth()]+"-"+endDay[now.getMonth()];
    }
    return dataFinal;
  }

  mudarCor(statusParcela: string){
    return statusParcela == "Pago"? 'blue': 'red';
  }
}

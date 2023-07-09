import { FormBuilder } from '@angular/forms';
import { LivroCaixaEntradaService } from './../shared/livro-caixa-entrada.service';
import { LivroCaixaEntrada } from './../shared/livro-caixa-entrada';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livro-caixa-entrada-list',
  templateUrl: './livro-caixa-entrada-list.component.html',
  styleUrls: ['./livro-caixa-entrada-list.component.css']
})
export class LivroCaixaEntradaListComponent implements OnInit {

  livrosCaixa: LivroCaixaEntrada[] = [];
  tabela: boolean = false;
  somar: number = 0;
  total: number = 0;

  listaForm = this.fb.group({
    dataInicial: ['',[]],
    dataFinal: ['',[]],
    tipoPagamento: ['',[]]
  });

  constructor(private livroCaixaEntradaService: LivroCaixaEntradaService,
              private fb: FormBuilder ) { }

  ngOnInit(): void {

  }

  findAll(){
    this.livroCaixaEntradaService.loadByAll().subscribe(
      res => this.livrosCaixa = res
    );
  }

  buscarPorDia(){
    let di = this.listaForm.value.dataInicial;
    let df = this.listaForm.value.dataFinal;
    let tp = this.listaForm.value.tipoPagamento;

    this.livroCaixaEntradaService.buscarPorDia(di, df, tp).subscribe((res: any)=>{
      this.somar = 0;
      this.total = 0;
      this.livrosCaixa = res;
      res.forEach(element => {
        this.somar = this.somar + element.valorRecebido;
      });
      this.total = this.somar;
    });
    this.tabela = true;
  }

}

import { GlobalService } from './../../shared/global.service';
import { FichaFinanceiraService } from './../shared/ficha-financeira.service';
import { CadastroService } from './../../cadastro/shared/cadastro.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Parcela } from '../shared/parcela';

@Component({
  selector: 'app-ficha-financeira-form',
  templateUrl: './ficha-financeira-form.component.html',
  styleUrls: ['./ficha-financeira-form.component.css'],
  preserveWhitespaces: true
})
export class FichaFinanceiraFormComponent implements OnInit {

  fichaFinanceiraForm: FormGroup;
  parcelaForm: FormGroup;
  parcelas: Parcela[];
  mostrar: boolean = false;
  mostBtnParc: boolean = false;
  valorParcela: number;
  statusPagamento: string;
  fichaFinanceiraId: number;
  parcelaId: number;
  _id: number;
  _data: string;
  fecharTabela: boolean = false;

  constructor(private fb: FormBuilder,
              private cadastroService: CadastroService ,
              private fichaFinanceiraService: FichaFinanceiraService,
              private globalService: GlobalService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.params;
    this.parcelaId = routeParams.id;
    this.findById(routeParams.id);
    this.findByFichaFinanceiraParcela(routeParams.id);
    this.fichaFinanceiraForm = this.fb.group({
      alunoId: ['',[]],
      nome: ['',[]],
      cpf: ['',[]],
      login: ['',[]],
      fichaFinanceiraId: ['',[]],
      dataGeracao: ['',[]],
      diaVencimento: ['',[]],
      valorMensal: ['',[]],
      statusFichaFinanceira: ['',[]],
    });

    this.parcelaForm = this.fb.group({
      id: ['',[]],
      dataPagamento: ['',[]],
      valor: ['',[]],
      juro: ['',[]],
      desconto: ['',[]],
      valorTotal: ['',[]],
      tipoPagamento: ['',[]],
      statusParcela: ['',[]],
      observacao: ['',[]],
      fichaFinanceira: ['',[]],
    })
  }

  findByIdUser(){
    this.cadastroService.loadById(this.fichaFinanceiraForm.get("alunoId").value).subscribe((dados: any)=>{
        if(dados != null){
          this.mostrar = true,
          this.updateFichaFinanceiraForm(dados)
        }
    })
  }

  findById(id){
    if(id != null){
      this.fichaFinanceiraService.findById(id).subscribe((dados: any)=>{
          this.mostrar = true,
          this.mostBtnParc = true,
          this.fecharTabela = true,
          this.updateFichaFinanceiraForm(dados),
          this.valorParcela = parseFloat(dados.valorMensal);
          this.fichaFinanceiraId = dados.fichaFinanceiraId;
      });
    }
  }

  findByFichaFinanceiraParcela(id){
    if(id != null){
    this.fichaFinanceiraService.findByFichaFinanceiraParcela(id).subscribe(
      dados => this.parcelas = dados
    );
    }
  }

  addParcela(){
    this.parcelaForm.get("valor").setValue(this.valorParcela);
    this.parcelaForm.get("fichaFinanceira").setValue(this.fichaFinanceiraId);
    this.statusPagamento ="A receber";
    this.parcelaForm.get("statusParcela").setValue(this.statusPagamento);
  }

  close(){
    this.findByFichaFinanceiraParcela(this.parcelaId);
 }

  mudarStatuaPag(){
    this.statusPagamento ="Pago";
    this.parcelaForm.get("statusParcela").setValue(this.statusPagamento);
  }

  estornarPag(){
    this.statusPagamento ="A receber";
    this.parcelaForm.get("statusParcela").setValue(this.statusPagamento);
  }

  valorTotal(){
      let valor: number = this.parcelaForm.get("valor").value;
      let juros: number = this.parcelaForm.get("juro").value;
      let descontos:number = this.parcelaForm.get("desconto").value;

      let valorTotal: number = valor+juros-descontos;

      this.parcelaForm.get("valorTotal").setValue(valorTotal);
   }

  updateFichaFinanceiraForm(fichaFinanceira){
    this.fichaFinanceiraForm.patchValue(fichaFinanceira);
  }

  onSubmit(){
    if(this.fichaFinanceiraForm.valid){
      this.fichaFinanceiraService.save(this.fichaFinanceiraForm.value).subscribe(
        success => { this.globalService.saveShow("Salvo com Sucesso", "Ficha Financeira"),
                      this.fecharTabela = false }
      );
    }
    this.fichaFinanceiraForm.reset();
  }

  onSubmitParcela(){
    if(this.parcelaForm.valid){
      this.fichaFinanceiraService.saveParcela(this.parcelaForm.value).subscribe(
        success =>{ this.globalService.saveShow("Incluida com Sucesso!", "Parcela")}
      );
    }
    this.parcelaForm.reset();
  }

  onEditParcela(parcela: any){
    this.parcelaForm.get("id").setValue(parcela.id);
    this.parcelaForm.get("dataPagamento").setValue(parcela.dataPagamento);
    this.parcelaForm.get("valor").setValue(parseFloat(parcela.valor));
    this.parcelaForm.get("valorTotal").setValue(parseFloat(parcela.valorTotal));
    this.parcelaForm.get("juro").setValue(parseFloat(parcela.juro));
    this.parcelaForm.get("desconto").setValue(parseFloat(parcela.desconto));
    this.parcelaForm.get("tipoPagamento").setValue(parcela.tipoPagamento);
    this.parcelaForm.get("observacao").setValue(parcela.observacao);
    this.parcelaForm.get("statusParcela").setValue(parcela.statusParcela);
    this.statusPagamento = this.parcelaForm.get("statusParcela").value;
    this.parcelaForm.get("fichaFinanceira").setValue(this.fichaFinanceiraId);
  }

  pegarParcela(id, data){
    this._id = id;
    this._data = data;
  }

  onDelete(){
    this.fichaFinanceiraService.remove(this._id).subscribe(
      success=> { this.globalService.removeShow("Removido com Sucesso!", "Parcela"),
                    this.findByFichaFinanceiraParcela(this.parcelaId)
    });

  }
}

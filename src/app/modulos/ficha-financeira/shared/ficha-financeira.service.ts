import { take, tap } from 'rxjs/operators';
import { FichaFinanceira } from './ficha-financeira';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Parcela } from './parcela';

@Injectable({
  providedIn: 'root'
})

export class FichaFinanceiraService {

  private readonly api = `${environment.api}/energy/api/fichaFinanceira`;

  constructor(private http: HttpClient) { }

  findById(id){
    return this.http.get(`${this.api}/${id}`).pipe(
      take(1)
    );
  }

  findAll(){
    return this.http.get<FichaFinanceira[]>(`${this.api}/listar`).pipe(
      take(1)
    );
  }

  loadByNome(nome){
    const httpParams = new HttpParams().set("nome", nome)
    const url = this.api + "/filtrar?" + httpParams;

    return this.http.get<FichaFinanceira[]>(url).pipe(
      take(1)
    );
  }

  findByFichaFinanceiraParcela(fichaFinancira){
    return this.http.get<Parcela[]>(`${this.api}/parcela/${fichaFinancira}`).pipe(
      take(1)
    );
  }

  findByAlunoId(alunoId){
    return this.http.get(`${this.api}/diaVencimento/${alunoId}`).pipe(
        take(1)
    );
  }

  private create(fichaFinanceira){
    return this.http.post(`${this.api}`, fichaFinanceira).pipe(
      take(1)
    );
  }

  private update(fichaFinanceira){
    return this.http.put(`${this.api}`, fichaFinanceira).pipe(
        take(1)
    );
  }

  save(fichaFinanceira){
    if(fichaFinanceira.fichaFinanceiraId){
      return this.update(fichaFinanceira);
    } else {
      return this.create(fichaFinanceira);
    }
  }

  private createParcela(parcela){
    return this.http.post(`${this.api}/parcela`, parcela).pipe(
      take(1)
    );
  }

  private updateParcela(parcela){
    return this.http.put(`${this.api}/parcela`, parcela).pipe(
      take(1)
    );
  }

  saveParcela(parcela){
    if(parcela.id){
      return this.updateParcela(parcela);
    } else {
      return this.createParcela(parcela);
    }
  }

  remove(id){
    return this.http.delete(`${this.api}/parcela/${id}`).pipe(
        take(1)
    );
  }

  buscaAvancadaAluno(alunoId, dataInicial, dataFinal, statusParcela){

    const httParams = new HttpParams()
    .set("alunoId", alunoId)
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal)
    .set("statusParcela", statusParcela);
    const url = this.api + "/buscar/aluno?" + httParams;

    return this.http.get<Parcela[]>(url).pipe(
      take(1)
    );
  }

  buscaAvancadaPeriodo(dataInicial, dataFinal, statusParcela){

    const httParams = new HttpParams()
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal)
    .set("statusParcela", statusParcela);
    const url = this.api + "/buscar/periodo?" + httParams;

    return this.http.get<Parcela[]>(url).pipe(
      take(1)
    );
  }

  buscaAvancadaTipo(dataInicial, dataFinal, tipoPagamento){

    const httParams = new HttpParams()
    .set("dataInicial", dataInicial)
    .set("dataFinal", dataFinal)
    .set("tipoPagamento", tipoPagamento);
    const url = this.api + "/buscar/tipo?" + httParams;

    return this.http.get<Parcela[]>(url).pipe(
      take(1)
    );
  }
}

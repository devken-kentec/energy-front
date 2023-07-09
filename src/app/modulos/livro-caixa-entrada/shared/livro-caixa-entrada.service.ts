import { LivroCaixaEntrada } from './livro-caixa-entrada';
import { take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivroCaixaEntradaService {

  private readonly api = `${environment.api}/energy/api/livroCaixaEntrada`;

  constructor(private http: HttpClient) { }


  loadByAll(){
    return this.http.get<LivroCaixaEntrada[]>(`${this.api}`).pipe(
      take(1)
    );
  }

  buscarPorDia(dataInicial: string, dataFinal: string, tipoPagamento: string){
    const httpParams = new HttpParams()
      .set("dataInicial", dataInicial)
      .set("dataFinal", dataFinal)
      .set("tipoPagamento", tipoPagamento)

      const url = this.api+"/buscar?"+httpParams;

    return this.http.get<LivroCaixaEntrada[]>(url).pipe(
      take(1)
    );
  }

  create(recebimento: any){
    return this.http.post(`${this.api}`, recebimento).pipe(
      take(1)
    );
  }
}

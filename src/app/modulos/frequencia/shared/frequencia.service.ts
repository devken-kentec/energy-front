import { take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Frequencia } from './frequencia';

@Injectable({
  providedIn: 'root'
})
export class FrequenciaService {

  constructor(private http: HttpClient) { }

  private readonly api = `${environment.api}/energy/api/frequencia`;

  findByFrequenciaDataAluno(alunoId, dataInicial, dataFinal){
    return this.http.get<Frequencia[]>(`${this.api}/frequenciaAluno/${alunoId}/${dataInicial}/${dataFinal}`).pipe(
      take(1)
    )
  }

  findByFrequenciaDia(){
    return this.http.get<Frequencia[]>(`${this.api}/frequenciaDia`).pipe(
      take(1)
    );
  }

  save(frequencia){
    return this.http.post(`${this.api}`, frequencia).pipe(
      take(1)
    );
  }

  updateFrequencia(id: number, statusTreino: boolean){
    return this.http.get(`${this.api}/frequenciaDia/${id}/${statusTreino}`).pipe(
      take(1)
    );
  }
}

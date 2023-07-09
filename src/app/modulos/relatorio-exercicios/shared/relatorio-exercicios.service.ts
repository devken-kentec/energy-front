import { take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Exercicios } from './exercicos';

@Injectable({
  providedIn: 'root'
})
export class RelatorioExerciciosService {

  private readonly api = `${environment.api}/energy/api/listaExercicio`;

  constructor(private http: HttpClient) { }

  loadByFichaTecnicaDia(dia, fichaTecnicaId){
    return this.http.get<Exercicios[]>(`${this.api}/listar/${dia}/${fichaTecnicaId}`).pipe(
       take(1)
    );
  }

  loadByExercicioDia(dia, alunoId){
    return this.http.get<Exercicios[]>(`${this.api}/consulta/${dia}/${alunoId}`).pipe(
      take(1)
    );
  }
}

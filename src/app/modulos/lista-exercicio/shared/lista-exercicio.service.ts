import { take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListaExercicio } from './lista-exercicio';

@Injectable({
  providedIn: 'root'
})
export class ListaExercicioService {

  private readonly api = `${environment.api}/energy/api/listaExercicio`;

  constructor(private http: HttpClient) { }

  findByListarExercicioFichaTecnica(fichaTecnicaId){
    return this.http.get<ListaExercicio[]>(`${this.api}/listar/${fichaTecnicaId}`).pipe(
      take(1)
    );
  }

  create(listaExercicio){
    return this.http.post(`${this.api}`, listaExercicio).pipe(
      take(1)
    );
  }

  remove(id){
    return this.http.delete(`${this.api}/${id}`).pipe(
      take(1)
    );
  }
}

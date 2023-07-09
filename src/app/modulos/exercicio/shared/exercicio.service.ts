import { ExercicioImagem } from './exercicio-imagem';
import { ExercicioPaginado } from './exercicio-paginado';
import { Exercicio } from './exercicio';
import { take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExercicioService {

  private readonly api = `${environment.api}/energy/api/exercicio`;

  constructor(private http: HttpClient) { }

  loadAll(){
    return this.http.get<Exercicio[]>(`${this.api}/listar`).pipe(
      take(1)
    );
  }

  loadByExercicioNome(nome){
    const httpParams = new HttpParams().set("nome", nome)
    const url = this.api + "/filtrar?" + httpParams;

    return this.http.get<Exercicio[]>(url).pipe(
      take(1)
    );
  }
  loadAllExercicioImg(id: number){
    return this.http.get<ExercicioImagem[]>(`${this.api}/listarexerimg/${id}`).pipe(
      take(1)
    );
  }

  loadById(id){
    return this.http.get(`${this.api}/${id}`).pipe(
      take(1)
    );
  }

  private create(exercicio){
    return this.http.post(`${this.api}`, exercicio).pipe(
      take(1)
    );
  }

  listExercicioPaginado(page, size){
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ExercicioPaginado>(`${this.api}/exercicioPage?${params.toString()}`).pipe(
      take(1)
    );
  }

  private update(exercicio){
    return this.http.put(`${this.api}`, exercicio).pipe(
      take(1)
    );
  }

  save(exercicio){
    if(exercicio.id){
      return this.update(exercicio);
    } else {
      return this.create(exercicio);
    }
  }

  remove(id){
    return this.http.get(`${this.api}/status/${id}`).pipe(
      take(1)
    );
  }

  saveExerImg(exerImg){
    return this.http.post(`${this.api}/exerimg`, exerImg).pipe(
      take(1)
    );
  }

  upload(id: number, formData: FormData){
    return this.http.put(`${this.api}/arquivo/${id}`, formData).pipe(
      take(1)
    );
  }

  removeImg(id){
    return this.http.delete(`${this.api}/removeimg/${id}`).pipe(
      take(1)
    );
  }
}

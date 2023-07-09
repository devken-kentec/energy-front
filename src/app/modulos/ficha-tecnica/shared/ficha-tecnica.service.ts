import { FichaTecnicaPaginada } from './ficha-tecnica-paginada';
import { FichaTecnica } from './ficha-tecnica';
import { take, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FichaTecnicaService {

  private readonly api = `${environment.api}/energy/api/fichaTecnica`;

  constructor(private http: HttpClient) { }

  loadAll(){
    return this.http.get<FichaTecnica[]>(`${this.api}/listar`).pipe(
      take(1)
    );
  }

  loadByFichaTecnicaAluno(alunoId){
    return this.http.get(`${this.api}/fichaAluno/${alunoId}`).pipe(
      take(1)
    );
  }

  listFichaTecnicaPaginada(page, size){
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<FichaTecnicaPaginada>(`${this.api}/fichaTecnicaPage?${params.toString()}`).pipe(
      take(1)
    );
  }

  loadByNome(nome){
    const httpParams = new HttpParams().set("nome", nome)
    const url = this.api + "/filtrar?" + httpParams;

    return this.http.get<FichaTecnica[]>(url).pipe(
      take(1)
    );
  }

  loadById(id){
      return this.http.get(`${this.api}/${id}`).pipe(
        take(1)
      );
  }

  private create(fichaTecnica){
     return this.http.post(`${this.api}`, fichaTecnica).pipe(
       take(1)
     );
  }

  private update(fichaTecnica){
    return this.http.put(`${this.api}`, fichaTecnica).pipe(
      take(1)
    );
  }

  save(fichaTecnica){
    if(fichaTecnica.id){
      return this.update(fichaTecnica);
    } else {
      return this.create(fichaTecnica);
    }
  }
}

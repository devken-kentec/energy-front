import { CadastroPaginado } from './cadastro-paginado';
import { Cadastro } from './cadastro';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private readonly api = `${environment.api}/energy/api/cadastro`;

  constructor(private http: HttpClient) { }

  startServer(){
    return this.http.get(`${this.api}/count`).pipe(
      take(1)
    );
  }

  loadAll(){
    return this.http.get<Cadastro[]>(`${this.api}/listar`).pipe(
      take(1)
    );
  }

  loadById(id){
    return this.http.get(`${this.api}/${id}`).pipe(
      take(1)
    );
  }

  loadByNome(nome){
    const httpParams = new HttpParams().set("nome", nome)
    const url = this.api + "/filtrar?" + httpParams;

    return this.http.get<Cadastro[]>(url).pipe(
      take(1)
    );
  }

  listCadastroPaginado(page, size){
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<CadastroPaginado>(`${this.api}/cadastroPage?${params.toString()}`).pipe(
      take(1)
    );
  }

  private create(cadastro){
    return this.http.post(`${this.api}`, cadastro).pipe(
      take(1)
    );
  }

  private update(cadastro){
    return this.http.put(`${this.api}`, cadastro).pipe(
      take(1)
    );
  }

  updateSenha(cadastro){
    return this.http.put(`${this.api}/senha`, cadastro).pipe(
      take(1)
    );
  }

  save(cadastro){
    if(cadastro.id){
     return this.update(cadastro);
    }else{
      return this.create(cadastro);
    }
  }

  remove(id){
    return this.http.get(`${this.api}/status/${id}`).pipe(
      take(1)
    );
  }

  upload(id: number, formData: FormData){
    return this.http.put(`${this.api}/arquivo/${id}`, formData).pipe(
      take(1)
    );
  }
}

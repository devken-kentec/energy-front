import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class GlobalService implements OnInit {

  id: number = 0;
  nome: string;
  nomeEmpresa: string = "KENTEC"
  tipo: string;

  private readonly api = `${environment.api}/energy/api`;

  constructor(private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit(): void {

  }

  loadByLogin(login: string){
    return this.http.get(`${this.api}/cadastro/autenticar/${login}`).pipe(
      take(1)
    );
  }

  setId(id: number){
    this.id = id;
  }

  setNome(nome: string){
    this.nome = nome;
}

  setTipo(tipo: string){
    this.tipo = tipo;
  }

  getId(): number {
    const id = this.id;
    return id;
  }

  getNome(): string {
    const nome = this.nome;
    return nome;
  }

  getNomeEmpresa(): string {
    const nomeEmpresa = this.nomeEmpresa;
    return nomeEmpresa;
  }

  getTipo(): string {
    let tipo: string
    tipo = this.tipo;
    return tipo;
  }

  saveShow(mensagem: string, titulo: string){
    this.toastr.success(mensagem, titulo);
  }

  removeShow(mensagem: string, titulo: string){
    this.toastr.error(mensagem, titulo)
  }

  warningShow(mensagem: string, titulo: string){
    this.toastr.warning(mensagem, titulo)
  }

  formatarCpf(cpf){
    let str:string = cpf;
    let p1 = str.substring(0,3);
    let p2 = str.substring(3, 6);
    let p3 = str.substring(6, 9);
    let p4 = str.substring(9, 11);
      cpf = p1 + "." + p2 + "." + p3 + "-" + p4;
    return cpf
   }

   consultaCep(cep: number){
    return this.http.get(`${this.api}/cadastro/buscarCep/${cep}` ).pipe(
      take(1)
    );
  }
}

import { GlobalService } from './../shared/global.service';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  tokenUrl: string = environment.api+environment.obterTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  mostrarMenuEmitter = new EventEmitter<boolean>();
  gId = new EventEmitter<number>();
  gLogin = new EventEmitter<string>();
  gTipo = new EventEmitter<string>();

  ngOnInit(): void {
  }

  obterToken(){
    const tokenString = localStorage.getItem('access_token')
    if(tokenString){
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.obterToken();
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

  setLoggedIn(value: boolean){
    this.mostrarMenuEmitter.emit(true);
    this.pegarCredenciais(this.getUsuarioAutenticado());
  }

  encerrarAutenticado(){
    localStorage.removeItem('access_token')
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();
    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }
    return null;
  }

  tentarLogar(username: string, password: string): Observable<any>{
    const params = new HttpParams()
                        .set('username', username)
                        .set('password', password)
                        .set('grant_type', 'password')
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type':'application/x-www-form-urlencoded'
    }
      return this.http.post(this.tokenUrl, params.toString(), { headers }).pipe(
        take(1)
      );
  }

  pegarCredenciais(login: string){
    this.globalService.loadByLogin(login).subscribe((res: any)=>{
      this.gId.emit(res.id);
      this.gLogin.emit(res.login);
      this.gTipo.emit(res.tipoUser);
    });
  }

}

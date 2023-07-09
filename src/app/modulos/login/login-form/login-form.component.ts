import { GlobalService } from './../../shared/global.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from './shared/usuario';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup
  usuarios: Usuario[];
  msgError: boolean = false;
  errors: string[];

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
       login: ['', []],
       senha: ['', []]
     });
   }

   logar(){
      let userName = this.loginForm.get('login')?.value;
      let password = this.loginForm.get('senha')?.value;

      this.authService.tentarLogar(userName, password).subscribe(response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token);
        this.router.navigate(['/']);
        this.authService.setLoggedIn(true);
      }, errorResponse => {
          this.errors = ['Usuário e/ou senha incorreto(s).'];
          this.msgError = true;
      });
   }

   fechar(){
    this.msgError = false;
   }
}

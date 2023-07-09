import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu-aluno-form',
  templateUrl: './menu-aluno-form.component.html',
  styleUrls: ['./menu-aluno-form.component.css']
})
export class MenuAlunoFormComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  frequencia(){
      this.router.navigate(['/frequencia']);
  }

  consultaFrequencia(){
    this.router.navigate(['/frequencia/listar']);
  }

  consultaExercicio(){
    this.router.navigate(['/relatorioexercicios/listarexercicios']);
  }

  consultaPagamento(){
    this.router.navigate(['/recibopagamento/recibo']);
  }

  exit(){
    this.authService.encerrarAutenticado();
  }
}

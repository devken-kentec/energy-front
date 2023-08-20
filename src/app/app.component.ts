import { CadastroService } from './modulos/cadastro/shared/cadastro.service';
import { GlobalService } from './modulos/shared/global.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jQuery from 'jquery';
import { AuthService } from './modulos/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KENTEC';

  id: number;
  mostrarMenu: boolean = false;
  user: string = "";
  tipo: string = "";
  vCad: boolean = false;
  vFin: boolean = false;
  vCon: boolean = false;
  visiCad: boolean = false;
  visiExe: boolean = false;
  visiFreq: boolean = false;
  visiFicTec: boolean = false;
  visiMens: boolean = false;
  visiLisExer: boolean = false;
  visiSenha: boolean = false;
  visiCon: boolean = false;
  visiLce: boolean = false;
  licenca: string = "6b656e746563-3032-656e65726779-65737061c3a76f207669766168-3031";
  nomeEmpresa: string;
  cont: any = 0;
  usuarioAutenticado: boolean;
  espera: boolean = false;

  constructor(private globalService: GlobalService,
              private router: Router,
              private cadastroService: CadastroService,
              private authService: AuthService){}

  ngOnInit(){

    this.startServer();
    this.mensagemDeEspera();

    this.usuarioAutenticado = this.authService.isAuthenticated();

    if(this.usuarioAutenticado){
      this.authService.gTipo.subscribe((res: any)=>{
        this.tipo = res;
        console.log("Ver tipo de dado", res);

          if(this.tipo === "Administrador"){
              this.visiCad = true;
              this.visiExe = true;
              this.visiFreq = true;
              this.visiFicTec = true;
              this.visiMens = true;
              this.visiLisExer = true;
              this.visiSenha = true;
              this.visiCon = true;
              console.log("Teste Adm");

          } else if(this.tipo === "Aluno"){
            this.visiFreq = true;
            this.visiCon = true;
            console.log("Teste ALuno");

          } else if(this.tipo === "Estagiário"){

            this.visiCon = true;
            this.visiFreq = true;
            this.visiFicTec = true;
            console.log("Teste Estagi");

          } else if(this.tipo === "Professor"){
            this.visiCon = true;
            this.visiFreq = true;
            this.visiFicTec = true;
            console.log("Teste Prof");
          }
       });
    }

    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => {this.mostrarMenu = mostrar
     });

     this.authService.gId.subscribe((dados: number) =>
        { this.id = dados,
          this.globalService.setId(this.id);
        }
     );

     this.authService.gLogin.subscribe(
       res=> { this.user = res }
     );

    this.router.navigate(['/login']);

 }

  exit(){
    this.authService.encerrarAutenticado();
  }

  startServer(){
    this.cadastroService.startServer().subscribe(
      res => this.cont = res
    )
  }

  mensagemDeEspera(){
    setInterval(()=>{
      this.espera = false;
    }, 15000);
    return this.espera;
  }

  ngAfterViewInit(){
    (function($) {
      "use strict";
      // Add active state to sidbar nav links
      var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
          $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
              if (this.href === path) {
                  $(this).addClass("active");
              }
          });
      // Toggle the side navigation
      $("#sidebarToggle").on("click", function(e) {
          e.preventDefault();
          $("body").toggleClass("sb-sidenav-toggled");
      });
    })(jQuery);
  }

}

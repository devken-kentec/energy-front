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

  licenca: string = "6b656e746563-3032-656e65726779-65737061c3a76f207669766168-3031";
  nomeEmpresa: string = "KenTec";
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

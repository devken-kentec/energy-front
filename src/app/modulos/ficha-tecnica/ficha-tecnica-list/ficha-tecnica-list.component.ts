import { FichaTecnicaService } from './../shared/ficha-tecnica.service';
import { FichaTecnica } from './../shared/ficha-tecnica';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ficha-tecnica-list',
  templateUrl: './ficha-tecnica-list.component.html',
  styleUrls: ['./ficha-tecnica-list.component.css'],
  preserveWhitespaces: true
})
export class FichaTecnicaListComponent implements OnInit {

  ficTecListForm: FormGroup;
  fichasTecnica: FichaTecnica[];
  _id: number = null;
  _nome: string = "";
  totalElements = 0;
  totalPages = 0;
  pagina = 0;
  tamanho = 5;
  paginaForm: FormGroup;

  constructor(private fb: FormBuilder,
              private fichaTecnicaService: FichaTecnicaService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarFichaTecnicaPaginada(this.pagina, this.tamanho);

    this.ficTecListForm = this.fb.group({
      nome: ['',[]]
    });

    this.paginaForm = this.fb.group({
      quantPag: [ 5 ]
    });
  }

  findAll(){
    this.fichaTecnicaService.loadAll().subscribe(
      res => this.fichasTecnica = res
    );
  }

  buscarAluno(){
    this.fichaTecnicaService.loadByNome(this.ficTecListForm.get('nome').value).subscribe(
      dados => this.fichasTecnica = dados
    );
  }

  onEdit(id){
    this.router.navigate(["editar", id], {relativeTo:this.route});
  }

  pegarDados(id, nome){

  }

  close(){

  }

  onDelete(){}

  listarFichaTecnicaPaginada(page, size){
    this.fichaTecnicaService.listFichaTecnicaPaginada(page, size).subscribe(
          response => { this.fichasTecnica = response.content;
                        this.totalElements = response.totalElements;
                        this.totalPages = response.totalPages;
                        }
    );
  }

  paginaMenor(){
    if(this.pagina <= 0){
      this.pagina = 0;
    } else {
      this.pagina = this.pagina - 1;
    }
     return this.listarFichaTecnicaPaginada(this.pagina, this.paginaForm.get('quantPag').value);
  }

  paginaMaior(){
    this.pagina = this.pagina + 1;
    return this.listarFichaTecnicaPaginada(this.pagina, this.paginaForm.get('quantPag').value);
  }

  atualizaPagina(){
    this.pagina = 0
    return this.listarFichaTecnicaPaginada(this.pagina, this.paginaForm.get('quantPag').value);
  }


}

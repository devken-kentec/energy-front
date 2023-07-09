import { FormBuilder } from '@angular/forms';
import { GlobalService } from './../../shared/global.service';
import { FichaFinanceiraService } from './../shared/ficha-financeira.service';
import { Component, OnInit } from '@angular/core';
import { FichaFinanceira } from '../shared/ficha-financeira';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ficha-financeira-list',
  templateUrl: './ficha-financeira-list.component.html',
  styleUrls: ['./ficha-financeira-list.component.css'],
  preserveWhitespaces: true
})
export class FichaFinanceiraListComponent implements OnInit {

  fichasFinanceiras: FichaFinanceira[];

  fichaFinanceiraListForm = this.fb.group({
    nome: ['',[]]
  });

  constructor(private fichaFinanceiraService: FichaFinanceiraService,
              public globalService: GlobalService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.fichaFinanceiraService.findAll().subscribe(
      dados => this.fichasFinanceiras = dados
    );
  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }
  onDelete(id){}

  buscarPessoa() {
    let nome = this.fichaFinanceiraListForm.value.nome;
    this.fichaFinanceiraService.loadByNome(nome).subscribe(
      res => this.fichasFinanceiras = res
    );
  }

}

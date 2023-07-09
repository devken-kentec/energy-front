import { take } from 'rxjs/operators';
import { GlobalService } from './../../shared/global.service';
import { FrequenciaService } from './../shared/frequencia.service';
import { Component, OnInit } from '@angular/core';
import { Frequencia } from '../shared/frequencia';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-frequencia-dia',
  templateUrl: './frequencia-dia.component.html',
  styleUrls: ['./frequencia-dia.component.css']
})
export class FrequenciaDiaComponent implements OnInit {

  mostrar: boolean;
  frequencias: Frequencia[] =[];
  n: number = 10800;


  constructor(private frequenciaService: FrequenciaService,
              private globalService: GlobalService,
              private router: Router) { }

  ngOnInit(): void {
    this.listar();

    const tempo = interval(30000);

    const periodo = tempo.pipe(take(this.n));

    periodo.subscribe((t)=>{
      console.log("Chamando");
      this.listar();


    });
  }

  listar(){
    this.frequenciaService.findByFrequenciaDia().subscribe((res: any) => {
            this.frequencias = res;
    });
  }

  voltar(){
    this.router.navigate(["/"]);
  }

  atualizar(){
    this.listar();
  }

  calcularTempo(horario: string){
    let horaI = horario.substring(0,2);
    let horaIm = parseInt(horaI)*60;
    let minI = horario.substring(3,5);
    let minIt = horaIm + parseInt(minI);
    var data = new Date();
    let horaTm = data.getHours() * 60;
    let minT = data.getMinutes();
    let minTt = horaTm + minT;

    let tempoTreino = minTt - minIt;
    return tempoTreino;
  }

  finalizarTreino(id: number){
    this.frequenciaService.updateFrequencia(id, false).subscribe(
      success => {
        this.globalService.saveShow("Finalizado com Sucesso!!","Treino"),
        this.listar();
      }
    );
  }

}

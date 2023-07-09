import { ExercicioImagem } from './../shared/exercicio-imagem';
import { GlobalService } from './../../shared/global.service';
import { ExercicioService } from './../shared/exercicio.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-exercicio-imagem',
  templateUrl: './exercicio-imagem.component.html',
  styleUrls: ['./exercicio-imagem.component.css']
})
export class ExercicioImagemComponent implements OnInit {

  exerciciosImg: ExercicioImagem[] = [];
  exercicioId: number = null;
  render: SafeResourceUrl;
  mostrarBtnImagem: boolean = false;

  exerImgForm = this.fb.group({
    id: ['', []],
    posicao: ['', []],
    comentario: ['', []],
    imagem: ['', []],
    descricaoExercicio: ['', []],
    exercicioId: ['', []]
  });

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private exercicioService: ExercicioService,
              private globalService: GlobalService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.findById(params.id);
    this.findAll(params.id);

  }

  findAll(id: number){
    this.exercicioService.loadAllExercicioImg(id).subscribe(
      res => this.exerciciosImg = res
    );
  }

  findById(id){
    if(id != null){
      this.exercicioService.loadById(id).subscribe((dados: any)=>{
          this.exerImgForm.patchValue({ exercicioId: dados.id });
          this.exerImgForm.patchValue({ descricaoExercicio: dados.nome });
          this.exercicioId = this.exerImgForm.value.exercicioId;
      });
    }
  }

  incluirImg(){
    this.exercicioService.saveExerImg(this.exerImgForm.value).subscribe(
      success => { this.globalService.saveShow("Imagem vinculada com sucesso!", "Imagem");
                   this.findAll(this.exercicioId);
                  }
    );
  }


  uploadImagem(event, id){
    const files = event.target.files;
    if(files){
      const imagem = files[0];
      const formData: FormData = new FormData();
      formData.append("arquivo", imagem);
      this.exercicioService.upload(id, formData).subscribe(
        sucess => { this.globalService.saveShow("Imagem adicionado com Sucesso!", "Exercicio"),
        this.findAll(this.exercicioId),
        (error: any) => { this.globalService.warningShow("Tamanho ou formato da imagem", "OPS!") }}
      );
    }

  }

  renderUrl(url: string){
    this.render = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${url}`)
    return this.render;
  }

  remove(id: number){
    this.exercicioService.removeImg(id).subscribe(
      success => { this.globalService.removeShow("Removida com Sucesso", "Imagem"),
                   this.findAll(this.exercicioId) }
    );
  }
}

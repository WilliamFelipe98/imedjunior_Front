import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NoticiasService } from '../../service/noticias.services'

@Component({
  selector: 'imedjunior-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
  formulario: FormGroup
  public router: Router
  noticia: any

  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private noticiaService: NoticiasService,
    private route: ActivatedRoute

  ) {
    this.router = router;
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      titulo: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      data: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      autor: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      imagem: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),

    })
    this.route.params.subscribe(paramsId => {
      if (paramsId['id']) {
        this.get(paramsId['id'])
      }
    })


  }
  get(id: number) {
    this.noticiaService.get(id)
      .subscribe(retorno => {
        this.noticia = retorno
        this.formulario.controls['id'].setValue(this.noticia.id);
        this.formulario.controls['titulo'].setValue(this.noticia.titulo);
        this.formulario.controls['descricao'].setValue(this.noticia.descricao);
        this.formulario.controls['data'].setValue(this.noticia.data);
        this.formulario.controls['autor'].setValue(this.noticia.autor);
        this.formulario.controls['imagem'].setValue(this.noticia.imagem);

      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }

  salvar(formulario: FormGroup) {
    if (formulario.value.id == 0) {
      this.noticiaService.save(formulario.value.imagem, formulario.value.titulo, formulario.value.descricao,formulario.value.data, formulario.value.autor)
        .subscribe(retorno => {
          alert("Enviado com Sucesso!")
          this.router.navigate(['/noticias'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      /*
      this.noticiaService.update(formulario.value.id, noticia)
        .subscribe(retorno => {
          alert("Enviado com Sucesso!")
          this.router.navigate(['/noticias'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
        */
    }
  }

}
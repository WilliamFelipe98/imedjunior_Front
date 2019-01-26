import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentoService } from '../../service/documentos.services'

@Component({
  selector: 'imedjunior-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {
  formulario: FormGroup
  public router: Router
  documento: any

  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private documentoService: DocumentoService,
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
      documento: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
    })
    this.route.params.subscribe(paramsId => {
      if (paramsId['id']) {
        this.get(paramsId['id'])
      }
    })


  }
  get(id: number) {
    this.documentoService.get(id)
      .subscribe(retorno => {
        this.documento = retorno
        this.formulario.controls['id'].setValue(this.documento.id);
        this.formulario.controls['titulo'].setValue(this.documento.titulo);
        this.formulario.controls['descricao'].setValue(this.documento.descricao);
        this.formulario.controls['data'].setValue(this.documento.data);
        this.formulario.controls['autor'].setValue(this.documento.autor);
        this.formulario.controls['documento'].setValue(this.documento.documento);
        this.formulario.controls['created_at'].setValue(this.documento.data);

      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }

  salvar(formulario: FormGroup) {
    let documento = {
      'titulo': formulario.value.titulo,
      'descricao': formulario.value.descricao,
      'autor': formulario.value.autor,
      'data': formulario.value.data,
      'documento': formulario.value.documento,
      'created_at': formulario.value.data
    }
    if (formulario.value.id == 0) {
      this.documentoService.save(documento)
        .subscribe(retorno => {
          alert("Enviado com Sucesso!")
          this.router.navigate(['/documentos'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.documentoService.update(formulario.value.id, documento)
        .subscribe(retorno => {
          alert("Enviado com Sucesso!")
          this.router.navigate(['/documentos'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }

}
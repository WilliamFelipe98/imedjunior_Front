import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentoService } from '../../service/documentos.services'

@Component({
  selector: 'imedjunior-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  listaDocumentos: any[] = []
  public loading = false;
  constructor( private documentoService:DocumentoService){}

  ngOnInit() {
    this.getList()
  }

  excluir(id: number) {
    this.documentoService.delete(id).subscribe(
      retorno => { 
        this.getList()
      }
    )
  }

  getList() {
    this.documentoService.getList().subscribe(
      retorno => {
        this.listaDocumentos = retorno
      }
    )
  }

}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContatosService } from '../../service/contatos.services'

@Component({
  selector: 'imedjunior-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {


  listaContatos: any[] = []
  public loading = false;

  constructor(private contatoService: ContatosService) { }

  ngOnInit() {
    this.getList()
  }

  excluir(id: number) {
    this.contatoService.delete(id).subscribe(
      retorno => {      
        this.getList()
      }
    )
  }

  getList() {
    this.loading = true
    this.contatoService.getList().subscribe(
      retorno => {
        this.listaContatos = retorno
        this.loading = false
      }
    )
  }
}
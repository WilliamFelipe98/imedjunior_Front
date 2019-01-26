import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NoticiasService } from '../../service/noticias.services'


@Component({
  selector: 'imedjunior-noticias-front',
  templateUrl: './noticias-front.component.html',
  styleUrls: ['./noticias-front.component.css']
})
export class NoticiasFrontComponent implements OnInit {

  listaNoticias: any[] = []
  public loading = false;
  constructor( private noticiaService:NoticiasService){}

  ngOnInit() {
    this.getList()
  }

  excluir(id: number) {
    this.noticiaService.delete(id).subscribe(
      retorno => { 
        this.getList()
      }
    )
  }

  getList() {
    this.noticiaService.getList().subscribe(
      retorno => {
        this.listaNoticias = retorno
      }
    )
  }

}
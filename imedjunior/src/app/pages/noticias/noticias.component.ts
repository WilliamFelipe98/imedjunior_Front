import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NoticiasService } from '../../service/noticias.services'


@Component({
  selector: 'imedjunior-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

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
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuariosService } from '../../service/usuarios.services'

@Component({
  selector: 'imedjunior-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listaUsuarios: any[] = []
  public loading = false;
  constructor( private usuarioService:UsuariosService){}

  ngOnInit() {
    this.getList()
  }

  excluir(id: number) {
    this.usuarioService.delete(id).subscribe(
      retorno => { 
        this.getList()
      }
    )
  }

  getList() {
    this.usuarioService.getList().subscribe(
      retorno => {
        this.listaUsuarios = retorno
        //console.log(retorno)

      }
    )
  }

}
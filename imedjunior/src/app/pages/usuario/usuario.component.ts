import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../service/usuarios.services'

@Component({
  selector: 'imedjunior-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  formulario: FormGroup
  public router: Router
  usuario: any

  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private route: ActivatedRoute

  ) {
    this.router = router;
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      telefone: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      login: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      senha: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
    })
    this.route.params.subscribe(paramsId => {
      if (paramsId['id']) {
        this.get(paramsId['id'])
      }
    })


  }
  get(id: number) {
    this.usuarioService.get(id)
      .subscribe(retorno => {
        this.usuario = retorno
        this.formulario.controls['id'].setValue(this.usuario.id);
        this.formulario.controls['nome'].setValue(this.usuario.nome);
        this.formulario.controls['telefone'].setValue(this.usuario.telefone);
        this.formulario.controls['login'].setValue(this.usuario.login);
        this.formulario.controls['senha'].setValue(this.usuario.senha);

      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }

  salvar(formulario: FormGroup) {
    let usuario = {
      'nome': formulario.value.nome,
      'telefone': formulario.value.telefone,
      'login': formulario.value.login,
      'senha': formulario.value.senha
    }
    if (formulario.value.id == 0) {
      this.usuarioService.save(usuario)
        .subscribe(retorno => {
          alert("Enviado com Sucesso!")
          this.router.navigate(['/usuarios'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.usuarioService.update(formulario.value.id, usuario)
        .subscribe(retorno => {
          alert("Enviado com Sucesso!")
          this.router.navigate(['/usuarios'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }

}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DespesaService } from '../../service/despesas.services'
import { UsuariosService } from '../../service/usuarios.services'

@Component({
  selector: 'imedjunior-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css']
})
export class DespesaComponent implements OnInit {
  listaDespesas: any[] = []
  listaUsuarios: any[] = []

  formulario: FormGroup
  public router: Router
  despesa: any
  nome: string = ""


  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private usuariosService: UsuariosService,
    private route: ActivatedRoute

  ) {
    this.router = router;
  }

  ngOnInit() {
    this.nome = sessionStorage.getItem("nome")
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      usuario: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      valor: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      data: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
    })
    this.getList()
    this.route.params.subscribe(paramsId => {
      if (paramsId['id']) {
        this.get(paramsId['id'])
      }
    })

  }
  getList() {
    this.usuariosService.getList().subscribe(
      retorno => {
        this.listaUsuarios = retorno
        console.log()
        
      }
    )
  }
  get(id: number) {
    this.despesaService.get(id)
      .subscribe(retorno => {
        this.despesa = retorno
        this.formulario.controls['id'].setValue(this.despesa.id);
        this.formulario.controls['descricao'].setValue(this.despesa.descricao);
        this.formulario.controls['usuario'].setValue(this.despesa.usuario);
        this.formulario.controls['valor'].setValue(this.despesa.valor);
        this.formulario.controls['data'].setValue(this.despesa.data);

      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }


  salvar(formulario: FormGroup) {
    let despesa = {
      'descricao': formulario.value.descricao,
      'usuario': formulario.value.usuario,
      'valor': formulario.value.valor,
      'data': formulario.value.data
    }
    if (formulario.value.id == 0) {
      this.despesaService.save(despesa)
        .subscribe(retorno => {
          alert("Enviado com Sucesso!")
          this.router.navigate(['/despesas'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.despesaService.update(formulario.value.id, despesa)
        .subscribe(retorno => {
          this.router.navigate(['/despesas'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }

}
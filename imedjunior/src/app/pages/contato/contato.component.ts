import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContatosService } from '../../service/contatos.services'

@Component({
  selector: 'nasa-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  enviado:string
  formulario: FormGroup
  public router: Router
  contato: any
  
  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private contatoService: ContatosService,
    private route: ActivatedRoute

  ) {
    this.router = router;
  }

  ngOnInit() {
    let x = sessionStorage.getItem("enviado")
    if(x=="ok"){
      alert("Dados enviados com sucesso")
      this.router.navigate(['/home'])
    }
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      telefone: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      email: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
    })
    this.route.params.subscribe(paramsId => {
      if (paramsId['id']) {
        this.get(paramsId['id'])
      }
    })


  }
  get(id: number) {
    this.contatoService.get(id)
      .subscribe(retorno => {
        this.contato = retorno
        this.formulario.controls['id'].setValue(this.contato.id);
        this.formulario.controls['nome'].setValue(this.contato.nome);
        this.formulario.controls['telefone'].setValue(this.contato.telefone);
        this.formulario.controls['email'].setValue(this.contato.email);
        this.formulario.controls['descricao'].setValue(this.contato.descricao);

      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }


  salvar(formulario: FormGroup) {
    let contato = { 
      'nome': formulario.value.nome, 
      'telefone': formulario.value.telefone, 
      'email': formulario.value.email, 
      'descricao': formulario.value.descricao }
      this.enviado="ok"
      sessionStorage.setItem("enviado",this.enviado)      
    if (formulario.value.id == 0) {
      this.contatoService.save(contato)
        .subscribe(retorno => {
          alert("Enviado com Sucesso!")
          this.router.navigate(['/home'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.contatoService.update(formulario.value.id, contato)
        .subscribe(retorno => {
          this.router.navigate(['/home'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }

}
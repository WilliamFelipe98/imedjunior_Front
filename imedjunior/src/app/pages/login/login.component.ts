import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { LoginService } from '../../service/login.services'

@Component({
  selector: 'imedjunior-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  router: Router;
  nome: string=""
  senha: string = ""
  
  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {
    this.router = router;
  }

  ngOnInit() {
    sessionStorage.getItem("nome")
    
  }
  login() {
    let usuario = { 'username': this.nome, 'password': this.senha}  
    this.loginService.login(usuario).subscribe(     
      retorno => {
        sessionStorage.setItem("token",retorno.token)
        window.location.reload()
        this.router.navigate(['/homelogin'])
      }, err => {
        alert("Senha Incorreta")
      })
      sessionStorage.setItem("nome",this.nome)
    }

  
}

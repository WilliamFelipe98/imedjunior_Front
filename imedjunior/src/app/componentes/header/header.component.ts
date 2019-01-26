import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'imedjunior-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nome:string =""
  checklogin: string = ""
  constructor() { }


  ngOnInit() {
    this.nome = sessionStorage.getItem("nome")
    this.checklogin = sessionStorage.getItem("token")


    }

}

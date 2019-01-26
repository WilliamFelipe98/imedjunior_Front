import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DespesaService } from '../../service/despesas.services'

@Component({
  selector: 'imedjunior-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent implements OnInit {


  listaDespesas: any[] = []
  public loading = false;

  constructor(private despesaService: DespesaService) { }

  ngOnInit() {
    this.getList()
  }

  excluir(id: number) {
    this.despesaService.delete(id).subscribe(
      retorno => {      
        this.getList()
      }
    )
  }

  getList() {
    this.loading = true
    this.despesaService.getList().subscribe(
      retorno => {
        this.listaDespesas = retorno
        //console.log(retorno)
        this.loading = false
      }
    )
  }
}
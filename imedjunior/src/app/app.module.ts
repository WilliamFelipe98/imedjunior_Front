import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ImedjuniorRoutingModule } from './/imedjunior-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { Error404Component } from './pages/error404/error404.component';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { DespesasComponent } from './pages/despesas/despesas.component';
import { DespesaComponent } from './pages/despesa/despesa.component';

import { DespesaService } from './service/despesas.services';
import { NoticiasComponent } from './pages/noticias/noticias.component'
import { NoticiasService } from './service/noticias.services';
import { LoginService } from './service/login.services';
import { NoticiaComponent } from './pages/noticia/noticia.component';
import { NoticiasFrontComponent } from './pages/noticias-front/noticias-front.component';
import { LoginComponent } from './pages/login/login.component';
import { DocumentosComponent } from './pages/documentos/documentos.component';
import { HomeloginComponent } from './pages/homelogin/homelogin.component';
import { DocumentoService } from './service/documentos.services';
import { DocumentoComponent } from './pages/documento/documento.component';
import { ContatosService } from './service/contatos.services';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { UsuariosService } from './service/usuarios.services';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContatoComponent,
    Error404Component,
    ProjetosComponent,
    DespesasComponent,
    DespesaComponent,
    NoticiasComponent,
    NoticiaComponent,
    NoticiasFrontComponent,
    LoginComponent,
    DocumentosComponent,
    HomeloginComponent,
    DocumentoComponent,
    ContatosComponent,
    UsuariosComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    ImedjuniorRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [DespesaService,NoticiasService,LoginService,DocumentoService,ContatosService,UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }


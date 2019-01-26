import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { DespesasComponent } from './pages/despesas/despesas.component';
import { DespesaComponent } from './pages/despesa/despesa.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { NoticiaComponent } from './pages/noticia/noticia.component';
import { NoticiasFrontComponent } from './pages/noticias-front/noticias-front.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeloginComponent } from './pages/homelogin/homelogin.component';
import { DocumentosComponent } from './pages/documentos/documentos.component';
import { DocumentoComponent} from './pages/documento/documento.component';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'contato', component: ContatoComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: 'projetos', component: ProjetosComponent },
  { path: 'despesas', component: DespesasComponent },
  { path: 'despesa', component: DespesaComponent },
  { path: 'noticiasFront', component: NoticiasFrontComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'noticia', component: NoticiaComponent },
  { path: 'despesa/:id', component: DespesaComponent },
  { path: 'noticia/:id', component: NoticiaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'homelogin', component: HomeloginComponent },
  { path: 'documentos', component: DocumentosComponent },
  { path: 'documento', component: DocumentoComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: '**', component: Error404Component },
 ];
@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class ImedjuniorRoutingModule { }
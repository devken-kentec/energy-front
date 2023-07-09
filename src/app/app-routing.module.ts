import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modulos/guards/auth-guards';

const routes: Routes = [
  { path: 'cadastro', loadChildren: ()=> import('./modulos/cadastro/cadastro.module').then(c => c.CadastroModule ), canActivate:[AuthGuard]},
  { path: 'exercicio', loadChildren: ()=> import('./modulos/exercicio/exercicio.module').then(e => e.ExercicioModule ), canActivate:[AuthGuard] },
  { path: 'fichatecnica', loadChildren: ()=> import('./modulos/ficha-tecnica/ficha-tecnica.module').then(ft => ft.FichaTecnicaModule ), canActivate:[AuthGuard] },
  { path: 'listaexercicio', loadChildren: ()=> import('./modulos/lista-exercicio/lista-exercicio.module').then(le => le.ListaExercicioModule ), canActivate:[AuthGuard] },
  { path: 'fichafinanceira', loadChildren: ()=> import('./modulos/ficha-financeira/ficha-financeira.module').then(ff => ff.FichaFinanceiraModule ), canActivate:[AuthGuard] },
  { path: 'frequencia', loadChildren: ()=> import('./modulos/frequencia/frequencia.module').then(f => f.FrequenciaModule), canActivate:[AuthGuard] },
  { path: 'relatorioexercicios', loadChildren: ()=> import('./modulos/relatorio-exercicios/relatorio-exercicios.module').then(re => re.RelatorioExerciciosModule ), canActivate:[AuthGuard]},
  { path: 'senha', loadChildren: ()=> import('./modulos/senha/senha.module').then(s => s.SenhaModule), canActivate:[AuthGuard]},
  { path: 'relatoriofinanceiro', loadChildren: ()=> import('./modulos/relatorio-financeiro/relatorio-financeiro.module').then(rf => rf.RelatorioFinanceiroModule), canActivate:[AuthGuard]},
  { path: 'menualuno', loadChildren: ()=> import('./modulos/menu-aluno/menu-aluno.module').then(ma => ma.MenuAlunoModule) , canActivate:[AuthGuard]},
  { path: 'recibopagamento', loadChildren: ()=> import('./modulos/recibo-pagamento/recibo-pagamento.module').then(r => r.ReciboPagamentoModule), canActivate:[AuthGuard]},
  { path: 'livrocaixaentrada', loadChildren: ()=> import('./modulos/livro-caixa-entrada/livro-caixa-entrada.module').then(lce => lce.LivroCaixaEntradaModule), canActivate:[AuthGuard]},
  { path: 'login', loadChildren: ()=> import('./modulos/login/login.module').then( l => l.LoginModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

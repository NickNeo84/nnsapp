import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RulesComponent} from './rulesSum/rules.component';
import {QuestComponent} from './quest/quest.component';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { NumbersComponent } from './numbers/numbers.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: QuestComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'quest', component: QuestComponent, canActivate: [AuthGuard] },
  { path: 'rules', component: RulesComponent, canActivate: [AuthGuard] },
  { path: 'numbers', component: NumbersComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
  ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, {useHash:true})],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
export const AppRoutingModule = RouterModule.forRoot(routes, {useHash:true});
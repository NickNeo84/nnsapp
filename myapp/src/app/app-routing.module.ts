import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RulesComponent} from './rules/rules.component';
import {QuestComponent} from './quest/quest.component';

const routes: Routes = [
  {path: '', redirectTo: '/quest', pathMatch: 'full' },
  {path: 'rules', component: RulesComponent},
  {path: 'quest', component: QuestComponent},
  { path: '**', component: QuestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

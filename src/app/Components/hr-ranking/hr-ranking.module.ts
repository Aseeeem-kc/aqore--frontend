import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HRRankingComponent } from './hr-ranking.component';
import { ChatbotComponent } from './chatbot.component';

const routes: Routes = [
  { path: '', component: HRRankingComponent }
];

@NgModule({
  declarations: [
    HRRankingComponent,
    ChatbotComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HRRankingModule { } 
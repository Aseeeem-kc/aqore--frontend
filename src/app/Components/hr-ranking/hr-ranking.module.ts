import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HRRankingComponent } from './hr-ranking.component';

const routes: Routes = [
  { path: '', component: HRRankingComponent }
];

@NgModule({
  declarations: [
    HRRankingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HRRankingModule { } 
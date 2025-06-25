import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetComponent } from '../dataset/dataset.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  { path: '', component: DatasetComponent } // Important: empty path for child route
];
@NgModule({
  declarations: [
    DatasetComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  exports: [RouterModule]
})
export class DatasetModule { }

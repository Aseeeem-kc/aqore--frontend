import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CVUploadComponent } from './cv-upload.component';

const routes: Routes = [
  { path: '', component: CVUploadComponent }
];

@NgModule({
  declarations: [
    CVUploadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CVUploadModule { } 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dataset',
    loadChildren: () =>
      import('./Components/dataset/dataset.module').then(m => m.DatasetModule)
  },
  {
    path: 'cv-upload',
    loadChildren: () =>
      import('./Components/cv-upload/cv-upload.module').then(m => m.CVUploadModule)
  },
  {
    path: 'hr',
    loadChildren: () =>
      import('./Components/hr-ranking/hr-ranking.module').then(m => m.HRRankingModule)
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./Components/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

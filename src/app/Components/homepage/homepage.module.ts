import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from '../homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { TimelineModule } from "../timeline/timeline.module";



const routes: Routes = [
  { path: '', component: HomepageComponent } // used for lazy loading
];

@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeaderModule,
    TimelineModule
],
    exports: [RouterModule]
})
export class HomepageModule { }

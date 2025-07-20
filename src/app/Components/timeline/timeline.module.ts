import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TimelineComponent } from './timeline.component';



@NgModule({
  declarations: [TimelineComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [TimelineComponent],
})
export class TimelineModule { }

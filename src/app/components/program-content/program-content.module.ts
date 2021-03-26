import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivitiesListModule } from 'src/app/components/activities-list/activities-list.module';
import { ProgramContentComponent } from './program-content.component';

@NgModule({
  declarations: [ProgramContentComponent],
  imports: [CommonModule, MatProgressBarModule, ActivitiesListModule],
  exports: [ProgramContentComponent],
})
export class ProgramContentModule {}

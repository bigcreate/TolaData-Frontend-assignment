import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivityItemModule } from 'src/app/components/activity-item/activity-item.module';
import { ActivitiesListComponent } from './activities-list.component';

@NgModule({
  declarations: [ActivitiesListComponent],
  exports: [ActivitiesListComponent],
  imports: [CommonModule, ActivityItemModule],
})
export class ActivitiesListModule {}

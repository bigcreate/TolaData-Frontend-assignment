import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityItemComponent } from './activity-item.component';

@NgModule({
  declarations: [ActivityItemComponent],
  exports: [ActivityItemComponent],
  imports: [CommonModule],
})
export class ActivityItemModule {}

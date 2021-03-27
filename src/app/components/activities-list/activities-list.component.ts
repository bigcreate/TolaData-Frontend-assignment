import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivitiesListComponent {
  @Input()
  activities: Activity[] = [];

  @Output()
  changeActivity = new EventEmitter<{
    activityUrl: string;
    activity: Partial<Activity>;
  }>();

  trackByActivityId(index: number, item: Activity): number {
    return item.id;
  }

  onChangeDescription(description: string, activityUrl: string): void {
    this.changeActivity.emit({ activityUrl, activity: { description } });
  }
}

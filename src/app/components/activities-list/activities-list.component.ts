import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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

  trackByActivityId(index: number, item: Activity): number {
    return item.id;
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityItemComponent {
  @Input()
  activity: Activity | undefined;
}

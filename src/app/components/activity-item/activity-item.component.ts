import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';

enum ActivityState {
  Default,
  Editing,
}

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityItemComponent {
  @Input()
  activity: Activity | undefined;

  @Output()
  changeDescription = new EventEmitter<string>();

  @Output()
  delete = new EventEmitter<void>();

  private state = ActivityState.Default;

  isStateDefault(): boolean {
    return this.state === ActivityState.Default;
  }

  isStateEditing(): boolean {
    return this.state === ActivityState.Editing;
  }

  editDescription(): void {
    this.state = ActivityState.Editing;
  }

  cancelEditingDescription(): void {
    this.state = ActivityState.Default;
  }

  saveDescription(value: string = ''): void {
    this.state = ActivityState.Default;
    this.changeDescription.emit(value);
  }

  deleteActivity(): void {
    this.delete.emit();
  }
}

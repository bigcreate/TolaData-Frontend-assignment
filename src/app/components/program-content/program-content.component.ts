import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Activity, NewActivity } from 'src/app/interfaces/activity';
import { Program } from 'src/app/interfaces/program';
import { AppState } from 'src/app/interfaces/state';
import {
  changeActivity,
  createActivity,
  getActivitiesByProgramId,
  removeActivity,
} from 'src/app/stores/activity/activity.actions';
import {
  selectActivitiesByProgram,
  selectPendingByProgramId,
} from 'src/app/stores/activity/activity.selectors';

enum ProgramState {
  Default,
  AddingActivity,
}

@Component({
  selector: 'app-program-content',
  templateUrl: './program-content.component.html',
  styleUrls: ['./program-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramContentComponent {
  @Input()
  set program(value: Program) {
    this.programData = value;
    this.programSubject.next(value);

    this.store.dispatch(getActivitiesByProgramId({ programId: value.id }));
  }

  activities$: Observable<Activity[]>;
  loading$: Observable<boolean>;
  nameFormControl: FormControl | undefined;
  startDateFormControl: FormControl | undefined;
  endDateFormControl: FormControl | undefined;
  newActivityForm: FormGroup | undefined;

  private programData: Program | undefined;
  private state = ProgramState.Default;
  private programSubject = new ReplaySubject<Program>(1);

  constructor(private readonly store: Store<AppState>) {
    this.activities$ = this.programSubject.asObservable().pipe(
      filter((program) => !!program),
      switchMap((program) =>
        this.store.select(selectActivitiesByProgram, { programUrl: program.url }),
      ),
    );
    this.loading$ = this.programSubject
      .asObservable()
      .pipe(
        switchMap((program) =>
          this.store.select(selectPendingByProgramId, { programId: program.id }),
        ),
      );
  }

  isStateDefault(): boolean {
    return this.state === ProgramState.Default;
  }

  isStateAddingActivity(): boolean {
    return this.state === ProgramState.AddingActivity;
  }

  setStateToAddingActivity(): void {
    this.state = ProgramState.AddingActivity;
    this.createNewActivityForm();
  }

  cancelCreatingNewActivity(): void {
    this.state = ProgramState.Default;
  }

  saveNewActivity(): void {
    if (!this.newActivityForm || this.newActivityForm.invalid || !this.programData) {
      return;
    }

    const { name, expected_start_date, expected_end_date } = this.newActivityForm.value;
    const data: NewActivity = {
      name,
      expected_start_date: expected_start_date && expected_start_date.format('YYYY-MM-DD'),
      expected_end_date: expected_end_date && expected_end_date.format('YYYY-MM-DD'),
      workflowlevel1: this.programData.url,
    };

    this.state = ProgramState.Default;
    this.store.dispatch(createActivity({ activity: data, programId: this.programData.id }));
  }

  onChangeDescription(activity: Activity, description: string): void {
    if (!this.programData) {
      return;
    }
    const modifiedActivity: Activity = { ...activity, description };
    this.store.dispatch(
      changeActivity({
        activityUrl: activity.url,
        activity: modifiedActivity,
        programId: this.programData.id,
      }),
    );
  }

  onDeleteActivity(id: number, activityUrl: string): void {
    if (!this.programData) {
      return;
    }
    this.store.dispatch(removeActivity({ id, activityUrl, programId: this.programData.id }));
  }

  trackByActivityId(index: number, item: Activity): number {
    return item.id;
  }

  private createNewActivityForm(): void {
    this.nameFormControl = new FormControl('', [Validators.required]);
    this.startDateFormControl = new FormControl();
    this.endDateFormControl = new FormControl();
    this.newActivityForm = new FormGroup({
      name: this.nameFormControl,
      expected_start_date: this.startDateFormControl,
      expected_end_date: this.endDateFormControl,
    });
  }
}

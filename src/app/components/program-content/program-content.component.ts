import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Activity } from 'src/app/interfaces/activity';
import { Program } from 'src/app/interfaces/program';
import { ActivitiesService } from 'src/app/services/activities.service';

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
  }

  activities$: Observable<Activity[]>;
  nameFormControl: FormControl | undefined;
  startDateFormControl: FormControl | undefined;
  endDateFormControl: FormControl | undefined;
  newActivityForm: FormGroup | undefined;

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  private programData: Program | undefined;
  private state = ProgramState.Default;
  private programSubject = new ReplaySubject<Program>();
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly activitiesService: ActivitiesService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.activities$ = this.programSubject.asObservable().pipe(
      tap(() => this.loadingSubject.next(true)),
      tap(() => this.cdr.detectChanges()),
      switchMap((program) => this.activitiesService.getByProgramId(program.id)),
      catchError(() => []), // show notification
      tap(() => this.loadingSubject.next(false)),
      tap(() => this.cdr.detectChanges()),
    );
  }

  isStateDefault(): boolean {
    return this.state === ProgramState.Default;
  }

  isStateAddingActivity(): boolean {
    return this.state === ProgramState.AddingActivity;
  }

  createNewActivityForm(): void {
    this.nameFormControl = new FormControl('', [Validators.required]);
    this.startDateFormControl = new FormControl();
    this.endDateFormControl = new FormControl();
    this.newActivityForm = new FormGroup({
      name: this.nameFormControl,
      expected_start_date: this.startDateFormControl,
      expected_end_date: this.endDateFormControl,
    });
  }

  setStateToAddingActivity(): void {
    this.state = ProgramState.AddingActivity;
    this.createNewActivityForm();
  }

  cancelCreatingNewActivity(): void {
    this.state = ProgramState.Default;
  }

  saveNewActivity(): void {
    if (
      !this.newActivityForm ||
      this.newActivityForm.invalid ||
      !this.programData
    ) {
      return;
    }

    const {
      name,
      expected_start_date,
      expected_end_date,
    } = this.newActivityForm.value;
    const data: Partial<Activity> = {
      name,
      expected_start_date:
        expected_start_date && expected_start_date.format('YYYY-MM-DD'),
      expected_end_date:
        expected_end_date && expected_end_date.format('YYYY-MM-DD'),
      workflowlevel1: this.programData.url,
    };

    this.state = ProgramState.Default;

    this.activitiesService.addActivity(data).subscribe(() => {
      // temporary solution
      if (this.programData) {
        this.program = this.programData;
      }
    });
  }

  onChangeDescription(activity: Activity, description: string): void {
    const modifiedActivity: Activity = { ...activity, description };

    this.activitiesService
      .changeActivity(activity.url, modifiedActivity)
      .subscribe(() => {
        // temporary solution
        if (this.programData) {
          this.program = this.programData;
        }
      });
  }

  onDeleteActivity(activityUrl: string): void {
    this.activitiesService.deleteActivity(activityUrl).subscribe(() => {
      // temporary solution
      if (this.programData) {
        this.program = this.programData;
      }
    });
  }

  trackByActivityId(index: number, item: Activity): number {
    return item.id;
  }
}

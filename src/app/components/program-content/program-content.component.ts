import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  Form,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Activity } from 'src/app/interfaces/activity';
import { Program } from 'src/app/interfaces/program';
import { ActivitiesService } from 'src/app/services/activities.service';
import { ProgramsService } from 'src/app/services/programs.service';

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
    this.programUrl = value.url;
    this.programSubject.next(value);
  }

  activities$: Observable<Activity[]>;
  nameFormControl: FormControl;
  startDateFormControl: FormControl;
  endDateFormControl: FormControl;
  newActivityForm: FormGroup;

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  private programData: Program | undefined;
  private programUrl: string | undefined;
  private state = ProgramState.Default;
  private programSubject = new ReplaySubject<Program>();
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly activitiesService: ActivitiesService,
    private readonly programsService: ProgramsService,
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

    this.nameFormControl = new FormControl('', [Validators.required]);
    this.startDateFormControl = new FormControl();
    this.endDateFormControl = new FormControl();
    this.newActivityForm = new FormGroup({
      name: this.nameFormControl,
      expected_start_date: this.startDateFormControl,
      expected_end_date: this.endDateFormControl,
    });
  }

  isStateDefault(): boolean {
    return this.state === ProgramState.Default;
  }

  isStateAddingActivity(): boolean {
    return this.state === ProgramState.AddingActivity;
  }

  setStateToAddingActivity(): void {
    this.state = ProgramState.AddingActivity;
  }

  saveNewActivity(): void {
    if (this.newActivityForm.invalid || !this.programUrl) {
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
    };

    // temporary solution
    this.programsService.addActivity(data, this.programUrl).subscribe(() => {
      if (this.programData) {
        this.program = this.programData;
      }
    });
  }
}

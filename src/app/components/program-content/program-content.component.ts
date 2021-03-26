import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Activity } from 'src/app/interfaces/activity';
import { Program } from 'src/app/interfaces/program';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-program-content',
  templateUrl: './program-content.component.html',
  styleUrls: ['./program-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramContentComponent {
  @Input()
  set program(value: Program) {
    this.programSubject.next(value);
  }

  activities$: Observable<Activity[]>;

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

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
      tap(() => this.loadingSubject.next(false)),
      tap(() => this.cdr.detectChanges()),
    );
  }
}

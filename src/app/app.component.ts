import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Program } from 'src/app/interfaces/program';
import { AppState } from 'src/app/interfaces/state';
import { ProgramsService } from 'src/app/services/programs.service';
import { getPrograms } from 'src/app/stores/program/program.actions';
import { selectAllPrograms, selectProgramsPending } from 'src/app/stores/program/program.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  programs$: Observable<Program[]>;
  loading$: Observable<boolean>;

  constructor(
    private readonly programsService: ProgramsService,
    private readonly store: Store<AppState>,
  ) {
    this.programs$ = this.store.select(selectAllPrograms);
    this.loading$ = this.store.select(selectProgramsPending);
  }

  ngOnInit(): void {
    this.store.dispatch(getPrograms());
  }
}

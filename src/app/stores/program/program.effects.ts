import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProgramsService } from 'src/app/services/programs.service';
import { getPrograms, loadPrograms } from './program.actions';

@Injectable()
export class ProgramEffects {
  loadPrograms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPrograms),
      switchMap(() => this.programsService.getAll()),
      catchError(() => []),
      map((programs) => loadPrograms({ programs })),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly programsService: ProgramsService,
  ) {}
}

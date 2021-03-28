import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';
import { ActivitiesService } from 'src/app/services/activities.service';
import {
  addActivity,
  changeActivity,
  createActivity,
  deleteActivity,
  getActivitiesByProgramId,
  removeActivity,
  updateActivity,
  upsertActivities,
} from './activity.actions';

@Injectable()
export class ActivityEffects {
  loadActivitiesByProgramId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActivitiesByProgramId),
      groupBy((action) => action.programId),
      mergeMap((group$) =>
        group$.pipe(
          switchMap(({ programId }) =>
            this.activitiesService.getByProgramId(programId).pipe(
              catchError(() => of([])),
              map((activities) => upsertActivities({ activities, programId })),
            ),
          ),
        ),
      ),
    ),
  );

  addActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createActivity),
      switchMap((action) =>
        this.activitiesService.addActivity(action.activity).pipe(
          map((activity) => addActivity({ activity, programId: action.programId })),
          catchError(() => of(null)),
          filter((newAction): newAction is NonNullable<typeof newAction> => !!newAction),
        ),
      ),
    ),
  );

  updateActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeActivity),
      switchMap(({ activityUrl, activity, programId }) =>
        this.activitiesService.changeActivity(activityUrl, activity).pipe(
          map(({ id, ...changes }) => updateActivity({ activity: { id, changes }, programId })),
          catchError(() => of(null)),
          filter((newAction): newAction is NonNullable<typeof newAction> => !!newAction),
        ),
      ),
    ),
  );

  deleteActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeActivity),
      switchMap((action) =>
        this.activitiesService.deleteActivity(action.activityUrl).pipe(
          map((activity) => deleteActivity({ id: action.id, programId: action.programId })),
          catchError(() => of(null)),
          filter((newAction): newAction is NonNullable<typeof newAction> => !!newAction),
        ),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly activitiesService: ActivitiesService,
  ) {}
}

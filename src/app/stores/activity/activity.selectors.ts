import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/state';
import { activitiesFeatureKey, ActivityState, selectAll } from './activity.reducer';

const selectActivityState = createFeatureSelector<AppState, ActivityState>(activitiesFeatureKey);

export const selectAllActivities = createSelector(selectActivityState, selectAll);

export const selectActivitiesByProgram = (programUrl: string) =>
  createSelector(selectAllActivities, (activities) =>
    activities.filter((activity) => activity.workflowlevel1 === programUrl),
  );

export const selectPendingByProgramId = (programId: number) =>
  createSelector(selectActivityState, (state) => !!state.pendingMap[programId]);

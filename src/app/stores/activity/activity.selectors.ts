import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Activity } from 'src/app/interfaces/activity';
import { AppState } from 'src/app/interfaces/state';
import { activitiesFeatureKey, ActivityState, selectAll } from './activity.reducer';

const selectActivityState = createFeatureSelector<AppState, ActivityState>(activitiesFeatureKey);

export const selectAllActivities = createSelector(selectActivityState, selectAll);

export const selectActivitiesByProgram = createSelector(
  selectAllActivities,
  (activities: Activity[], props: { programUrl: string }) =>
    activities.filter((activity) => activity.workflowlevel1 === props.programUrl),
);

export const selectPendingByProgramId = createSelector(
  selectActivityState,
  (state: ActivityState, props: { programId: number }) => !!state.pendingMap[props.programId],
);

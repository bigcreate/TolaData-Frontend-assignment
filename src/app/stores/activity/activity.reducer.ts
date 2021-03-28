import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Activity } from 'src/app/interfaces/activity';
import * as ActivityActions from './activity.actions';

export const activitiesFeatureKey = 'activities';

type PendingMap = Record<number, boolean>;

export interface ActivityState extends EntityState<Activity> {
  pendingMap: PendingMap;
}

export const adapter: EntityAdapter<Activity> = createEntityAdapter<Activity>();

export const initialState: ActivityState = adapter.getInitialState({
  pendingMap: {},
});

export const reducer = createReducer(
  initialState,
  on(ActivityActions.getActivitiesByProgramId, (state, action) => ({
    ...state,
    pendingMap: updatePendingMap(action.programId, true, state.pendingMap),
  })),
  on(ActivityActions.createActivity, (state, action) => ({
    ...state,
    pendingMap: updatePendingMap(action.programId, true, state.pendingMap),
  })),
  on(ActivityActions.changeActivity, (state, action) => ({
    ...state,
    pendingMap: updatePendingMap(action.programId, true, state.pendingMap),
  })),
  on(ActivityActions.removeActivity, (state, action) => ({
    ...state,
    pendingMap: updatePendingMap(action.programId, true, state.pendingMap),
  })),
  on(ActivityActions.addActivity, (state, action) =>
    adapter.addOne(action.activity, {
      ...state,
      pendingMap: updatePendingMap(action.programId, false, state.pendingMap),
    }),
  ),
  on(ActivityActions.upsertActivities, (state, action) =>
    adapter.upsertMany(action.activities, {
      ...state,
      pendingMap: updatePendingMap(action.programId, false, state.pendingMap),
    }),
  ),
  on(ActivityActions.updateActivity, (state, action) =>
    adapter.updateOne(action.activity, {
      ...state,
      pendingMap: updatePendingMap(action.programId, false, state.pendingMap),
    }),
  ),
  on(ActivityActions.deleteActivity, (state, action) =>
    adapter.removeOne(action.id, {
      ...state,
      pendingMap: updatePendingMap(action.programId, false, state.pendingMap),
    }),
  ),
);

function updatePendingMap(
  programId: number | undefined,
  value: boolean,
  pendingMap: PendingMap,
): PendingMap {
  if (!programId) {
    return pendingMap;
  }
  return {
    ...pendingMap,
    [programId]: value,
  };
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

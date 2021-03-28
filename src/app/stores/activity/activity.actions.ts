import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Activity, NewActivity } from 'src/app/interfaces/activity';

export const getActivities = createAction('Get Activities');

export const getActivitiesByProgramId = createAction(
  'Get Activities by Program Id',
  props<{ programId: number }>(),
);

export const createActivity = createAction(
  'Create Activity',
  props<{ activity: NewActivity; programId: number }>(),
);
export const changeActivity = createAction(
  'Change Activity',
  props<{ activityUrl: string; activity: Activity; programId: number }>(),
);

export const addActivity = createAction(
  '[Activity/API] Add Activity',
  props<{ activity: Activity; programId: number }>(),
);

export const removeActivity = createAction(
  'Remove Activity',
  props<{ id: number; activityUrl: string; programId: number }>(),
);

export const upsertActivities = createAction(
  '[Activity/API] Upsert Activities',
  props<{ activities: Activity[]; programId: number }>(),
);

export const updateActivity = createAction(
  '[Activity/API] Update Activity',
  props<{ activity: Update<Activity>; programId: number }>(),
);

export const deleteActivity = createAction(
  '[Activity/API] Delete Activity',
  props<{ id: number; programId: number }>(),
);

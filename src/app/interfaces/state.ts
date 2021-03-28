import { activitiesFeatureKey, ActivityState } from 'src/app/stores/activity/activity.reducer';
import { programFeatureKey, ProgramState } from 'src/app/stores/program/program.reducer';

export interface AppState {
  [programFeatureKey]: ProgramState;
  [activitiesFeatureKey]: ActivityState;
}

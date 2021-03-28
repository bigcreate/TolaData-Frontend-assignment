import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Program } from 'src/app/interfaces/program';
import * as ProgramActions from './program.actions';

export const programFeatureKey = 'program';

export interface ProgramState extends EntityState<Program> {
  pending: boolean;
}

export const adapter: EntityAdapter<Program> = createEntityAdapter<Program>();

export const initialState: ProgramState = adapter.getInitialState({
  pending: false,
});

export const reducer = createReducer(
  initialState,
  on(ProgramActions.getPrograms, (state, action) => ({
    ...state,
    pending: true,
  })),
  on(ProgramActions.loadPrograms, (state, action) =>
    adapter.setAll(action.programs, { ...state, pending: false }),
  ),
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/state';
import { programFeatureKey, ProgramState, selectAll } from './program.reducer';

const selectProgram = createFeatureSelector<AppState, ProgramState>(programFeatureKey);

export const selectProgramsPending = createSelector(selectProgram, (state) => state.pending);
export const selectAllPrograms = createSelector(selectProgram, selectAll);

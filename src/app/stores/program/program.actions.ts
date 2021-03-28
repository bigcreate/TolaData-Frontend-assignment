import { createAction, props } from '@ngrx/store';
import { Program } from 'src/app/interfaces/program';

export const getPrograms = createAction('Get Programs');

export const loadPrograms = createAction('Load Programs', props<{ programs: Program[] }>());

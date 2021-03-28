import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ProgramEffects } from './program.effects';

@NgModule({
  imports: [EffectsModule.forFeature([ProgramEffects])],
})
export class ProgramStoreModule {}

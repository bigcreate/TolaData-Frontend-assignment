import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActivityEffects } from './activity.effects';

@NgModule({
  imports: [EffectsModule.forFeature([ActivityEffects])],
})
export class ActivityStoreModule {}

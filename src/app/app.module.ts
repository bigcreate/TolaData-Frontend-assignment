import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProgramListModule } from 'src/app/components/program-list/program-list.module';
import { AuthInterceptor } from 'src/app/services/auth.interceptor';
import { ActivityStoreModule } from 'src/app/stores/activity/activity.module';
import {
  activitiesFeatureKey,
  reducer as activityReducer,
} from 'src/app/stores/activity/activity.reducer';
import { ProgramStoreModule } from 'src/app/stores/program/program.module';
import {
  programFeatureKey,
  reducer as programReducer,
} from 'src/app/stores/program/program.reducer';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProgramListModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(
      {
        [programFeatureKey]: programReducer,
        [activitiesFeatureKey]: activityReducer,
      },
      {},
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    ProgramStoreModule,
    ActivityStoreModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}

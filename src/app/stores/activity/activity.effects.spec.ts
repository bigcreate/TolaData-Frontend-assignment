import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import {
  getActivitiesByProgramId,
  upsertActivities,
} from 'src/app/stores/activity/activity.actions';
import { ActivityEffects } from './activity.effects';
import SpyObj = jasmine.SpyObj;

describe('ActivityEffects', () => {
  let actions$: Observable<any>;
  let effects: ActivityEffects;
  let activitiesService: SpyObj<ActivitiesService>;

  beforeEach(() => {
    const activitiesServiceSpy = jasmine.createSpyObj('ActivitiesService', ['getByProgramId']);
    TestBed.configureTestingModule({
      providers: [
        ActivityEffects,
        provideMockActions(() => actions$),
        { provide: ActivitiesService, useValue: activitiesServiceSpy },
      ],
    });

    activitiesService = TestBed.inject(ActivitiesService) as SpyObj<ActivitiesService>;
    effects = TestBed.inject(ActivityEffects);
  });

  it('should load activities', () => {
    actions$ = hot('-a-ab-b--a---b-', {
      a: getActivitiesByProgramId({ programId: 1 }),
      b: getActivitiesByProgramId({ programId: 2 }),
    });
    const expected = hot('------a--b--a---b-', {
      a: upsertActivities({ activities: [{ id: 1 }, { id: 2 }] as Activity[], programId: 1 }),
      b: upsertActivities({ activities: [{ id: 3 }, { id: 4 }] as Activity[], programId: 2 }),
    });

    activitiesService.getByProgramId.and.callFake((programId) => {
      const value = programId === 1 ? [{ id: 1 }, { id: 2 }] : [{ id: 3 }, { id: 4 }];
      return cold(`---a|`, { a: value });
    });

    expect(effects.loadActivitiesByProgramId$).toBeObservable(expected);
  });
});

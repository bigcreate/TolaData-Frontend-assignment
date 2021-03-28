import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Activity } from 'src/app/interfaces/activity';
import { Program } from 'src/app/interfaces/program';
import { getActivitiesByProgramId } from 'src/app/stores/activity/activity.actions';
import {
  selectActivitiesByProgram,
  selectPendingByProgramId,
} from 'src/app/stores/activity/activity.selectors';
import { ProgramContentComponent } from './program-content.component';

describe('ProgramContentComponent', () => {
  let component: ProgramContentComponent;
  let fixture: ComponentFixture<ProgramContentComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramContentComponent],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProgramContentComponent);
    component = fixture.componentInstance;
  });

  it('should dispatch "getActivitiesByProgramId" action everytime when "program" is set', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    store.overrideSelector(selectActivitiesByProgram, []);
    store.overrideSelector(selectPendingByProgramId, false);

    fixture.detectChanges();

    component.program = { id: 1 } as Program;
    component.program = { id: 2 } as Program;

    expect(dispatchSpy.calls.allArgs()).toEqual([
      [getActivitiesByProgramId({ programId: 1 })],
      [getActivitiesByProgramId({ programId: 2 })],
    ]);
  });

  it('should display activities list if it is not empty', () => {
    spyOn(store, 'dispatch');
    const mockSelectActivitiesByProgram = store.overrideSelector(selectActivitiesByProgram, []);
    store.overrideSelector(selectPendingByProgramId, false);

    component.program = { id: 1 } as Program;
    fixture.detectChanges();

    mockSelectActivitiesByProgram.setResult([{ id: 1 }, { id: 2 }] as Activity[]);
    store.refreshState();
    fixture.detectChanges();

    const activitiesCount = fixture.debugElement.queryAll(By.css('app-activity-item')).length;
    expect(activitiesCount).toBe(2);
  });
});

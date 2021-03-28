import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Program } from 'src/app/interfaces/program';
import { getPrograms } from 'src/app/stores/program/program.actions';
import { selectAllPrograms, selectProgramsPending } from 'src/app/stores/program/program.selectors';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should dispatch "Get programs" action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    store.overrideSelector(selectAllPrograms, []);
    store.overrideSelector(selectProgramsPending, false);

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(getPrograms());
  });

  it('should display programs list', () => {
    spyOn(store, 'dispatch');

    const mockSelectAllPrograms = store.overrideSelector(selectAllPrograms, []);
    store.overrideSelector(selectProgramsPending, false);

    store.refreshState();

    mockSelectAllPrograms.setResult([{ id: 1 }, { id: 2 }] as Program[]);
    store.refreshState();
    fixture.detectChanges();

    const programList = fixture.debugElement.query(By.css('.programs-list'));
    expect(programList).toBeInstanceOf(DebugElement);
    expect(programList.properties.programs).toEqual([{ id: 1 }, { id: 2 }]);
  });
});

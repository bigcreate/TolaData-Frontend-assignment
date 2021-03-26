import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramContentComponent } from './program-content.component';

describe('ProgramContentComponent', () => {
  let component: ProgramContentComponent;
  let fixture: ComponentFixture<ProgramContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

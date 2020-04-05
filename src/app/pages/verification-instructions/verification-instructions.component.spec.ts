import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationInstructionsComponent } from './verification-instructions.component';

describe('VerificationInstructionsComponent', () => {
  let component: VerificationInstructionsComponent;
  let fixture: ComponentFixture<VerificationInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

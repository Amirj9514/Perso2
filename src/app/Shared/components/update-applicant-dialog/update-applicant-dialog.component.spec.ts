import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApplicantDialogComponent } from './update-applicant-dialog.component';

describe('UpdateApplicantDialogComponent', () => {
  let component: UpdateApplicantDialogComponent;
  let fixture: ComponentFixture<UpdateApplicantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateApplicantDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateApplicantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

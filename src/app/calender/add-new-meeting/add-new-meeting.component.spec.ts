import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMeetingComponent } from './add-new-meeting.component';

describe('AddNewMeetingComponent', () => {
  let component: AddNewMeetingComponent;
  let fixture: ComponentFixture<AddNewMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewMeetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

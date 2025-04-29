import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewMeetingComponent } from './view-new-meeting.component';

describe('ViewNewMeetingComponent', () => {
  let component: ViewNewMeetingComponent;
  let fixture: ComponentFixture<ViewNewMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewNewMeetingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNewMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

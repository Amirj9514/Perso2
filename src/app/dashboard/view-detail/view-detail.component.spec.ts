import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailComponent } from './view-detail.component';

describe('ViewDetailComponent', () => {
  let component: ViewDetailComponent;
  let fixture: ComponentFixture<ViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

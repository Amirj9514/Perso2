import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViewDetailComponent } from './add-view-detail.component';

describe('AddViewDetailComponent', () => {
  let component: AddViewDetailComponent;
  let fixture: ComponentFixture<AddViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddViewDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

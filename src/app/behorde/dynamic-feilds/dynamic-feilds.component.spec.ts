import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFeildsComponent } from './dynamic-feilds.component';

describe('DynamicFeildsComponent', () => {
  let component: DynamicFeildsComponent;
  let fixture: ComponentFixture<DynamicFeildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFeildsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFeildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

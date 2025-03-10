import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrkundeComponent } from './urkunde.component';

describe('UrkundeComponent', () => {
  let component: UrkundeComponent;
  let fixture: ComponentFixture<UrkundeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrkundeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrkundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

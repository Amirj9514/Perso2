import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehordeComponent } from './behorde.component';

describe('BehordeComponent', () => {
  let component: BehordeComponent;
  let fixture: ComponentFixture<BehordeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BehordeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehordeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

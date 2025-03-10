import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S81aComponent } from './s81a.component';

describe('S81aComponent', () => {
  let component: S81aComponent;
  let fixture: ComponentFixture<S81aComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [S81aComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S81aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

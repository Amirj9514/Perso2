import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbeitgeberComponent } from './arbeitgeber.component';

describe('ArbeitgeberComponent', () => {
  let component: ArbeitgeberComponent;
  let fixture: ComponentFixture<ArbeitgeberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbeitgeberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArbeitgeberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

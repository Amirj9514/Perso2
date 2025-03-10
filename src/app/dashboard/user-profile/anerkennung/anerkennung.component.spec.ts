import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnerkennungComponent } from './anerkennung.component';

describe('AnerkennungComponent', () => {
  let component: AnerkennungComponent;
  let fixture: ComponentFixture<AnerkennungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnerkennungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnerkennungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProzessubersichtComponent } from './prozessubersicht.component';

describe('ProzessubersichtComponent', () => {
  let component: ProzessubersichtComponent;
  let fixture: ComponentFixture<ProzessubersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProzessubersichtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProzessubersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDeComponent } from './info-de.component';

describe('InfoDeComponent', () => {
  let component: InfoDeComponent;
  let fixture: ComponentFixture<InfoDeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoDeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonlicheDatenComponent } from './personliche-daten.component';

describe('PersonlicheDatenComponent', () => {
  let component: PersonlicheDatenComponent;
  let fixture: ComponentFixture<PersonlicheDatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonlicheDatenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonlicheDatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

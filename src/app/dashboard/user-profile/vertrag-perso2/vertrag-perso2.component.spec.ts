import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VertragPerso2Component } from './vertrag-perso2.component';

describe('VertragPerso2Component', () => {
  let component: VertragPerso2Component;
  let fixture: ComponentFixture<VertragPerso2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VertragPerso2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VertragPerso2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VorstellungsgesrpachComponent } from './vorstellungsgesrpach.component';

describe('VorstellungsgesrpachComponent', () => {
  let component: VorstellungsgesrpachComponent;
  let fixture: ComponentFixture<VorstellungsgesrpachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VorstellungsgesrpachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VorstellungsgesrpachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

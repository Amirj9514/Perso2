import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnterkunftComponent } from './unterkunft.component';

describe('UnterkunftComponent', () => {
  let component: UnterkunftComponent;
  let fixture: ComponentFixture<UnterkunftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnterkunftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnterkunftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

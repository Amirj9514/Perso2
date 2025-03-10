import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSidebarComponent } from './tab-sidebar.component';

describe('TabSidebarComponent', () => {
  let component: TabSidebarComponent;
  let fixture: ComponentFixture<TabSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

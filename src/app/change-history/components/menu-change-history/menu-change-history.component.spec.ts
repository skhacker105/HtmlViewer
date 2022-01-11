import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChangeHistoryComponent } from './menu-change-history.component';

describe('MenuChangeHistoryComponent', () => {
  let component: MenuChangeHistoryComponent;
  let fixture: ComponentFixture<MenuChangeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuChangeHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuChangeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

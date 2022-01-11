import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAccessComponent } from './menu-access.component';

describe('MenuAccessComponent', () => {
  let component: MenuAccessComponent;
  let fixture: ComponentFixture<MenuAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

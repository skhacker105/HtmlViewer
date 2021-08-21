import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageControlChangeHistoryComponent } from './page-control-change-history.component';

describe('PageControlChangeHistoryComponent', () => {
  let component: PageControlChangeHistoryComponent;
  let fixture: ComponentFixture<PageControlChangeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageControlChangeHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageControlChangeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

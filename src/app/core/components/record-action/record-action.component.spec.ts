import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordActionComponent } from './record-action.component';

describe('RecordActionComponent', () => {
  let component: RecordActionComponent;
  let fixture: ComponentFixture<RecordActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

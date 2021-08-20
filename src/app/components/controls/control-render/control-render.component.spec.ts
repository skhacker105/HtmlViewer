import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlRenderComponent } from './control-render.component';

describe('ControlRenderComponent', () => {
  let component: ControlRenderComponent;
  let fixture: ComponentFixture<ControlRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

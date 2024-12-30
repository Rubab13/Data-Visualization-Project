import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scatter1Component } from './scatter1.component';

describe('Scatter1Component', () => {
  let component: Scatter1Component;
  let fixture: ComponentFixture<Scatter1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Scatter1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Scatter1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

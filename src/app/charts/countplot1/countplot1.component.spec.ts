import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Countplot1Component } from './countplot1.component';

describe('Countplot1Component', () => {
  let component: Countplot1Component;
  let fixture: ComponentFixture<Countplot1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Countplot1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Countplot1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

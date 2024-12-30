import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactLevelPieChartComponent } from './contact-level-pie-chart.component';

describe('ContactLevelPieChartComponent', () => {
  let component: ContactLevelPieChartComponent;
  let fixture: ComponentFixture<ContactLevelPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactLevelPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactLevelPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgChartsModule } from 'ng2-charts';

import { EmissionsPerTransportypeChartComponent } from './emissions-per-transportype-chart.component';

describe('EmissionsPerTransportypeChartComponent', () => {
  let component: EmissionsPerTransportypeChartComponent;
  let fixture: ComponentFixture<EmissionsPerTransportypeChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmissionsPerTransportypeChartComponent ],
      imports: [ NgChartsModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmissionsPerTransportypeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

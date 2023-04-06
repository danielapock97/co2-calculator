import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgChartsModule } from 'ng2-charts';

import { AdminEmissionsPerTransportypeChartComponent } from './admin-emissions-per-transportype-chart.component';

describe('EmissionsPerTransportypeChartComponent', () => {
  let component: AdminEmissionsPerTransportypeChartComponent;
  let fixture: ComponentFixture<AdminEmissionsPerTransportypeChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmissionsPerTransportypeChartComponent ],
      imports: [ NgChartsModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmissionsPerTransportypeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

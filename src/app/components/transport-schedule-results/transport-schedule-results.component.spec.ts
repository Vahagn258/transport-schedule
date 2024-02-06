import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportScheduleResultsComponent } from './transport-schedule-results.component';

describe('TransportScheduleResultsComponent', () => {
  let component: TransportScheduleResultsComponent;
  let fixture: ComponentFixture<TransportScheduleResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportScheduleResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportScheduleResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

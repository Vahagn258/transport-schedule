import { Component, OnDestroy, OnInit, QueryList, ViewChildren, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';
import moment from "moment";
import { TransportsScheduleService } from '../../services/transports-schedule.service';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, MatAutocompleteModule } from '@angular/material/autocomplete';
import { BehaviorSubject, Subject, debounceTime, filter, takeUntil } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { TransportScheduleResultsComponent } from '../transport-schedule-results/transport-schedule-results.component';
import { IResponse } from '../../interfaces/interfaces';

@Component({
  selector: 'app-transport-schedule',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    AsyncPipe,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    TransportScheduleResultsComponent
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {

          dateInput: 'DD.MM.YYYY',
        },
        display: {
          dateInput: 'DD.MM.YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM-YYYY',
        }
      }
    },
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: {
        overlayPanelClass: 'autocomplete-overlay'
      }
    }
  ],
  templateUrl: './transport-schedule.component.html',
  styleUrl: './transport-schedule.component.scss'
})
export class TransportScheduleComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private transportsScheduleService = inject(TransportsScheduleService);
  public form = this.fb.group({
    transport_types: [''],
    date: ['', [Validators.required]],
    from: ['', [Validators.required]],
    to: ['', [Validators.required]]
  });
  public today = moment().format('YYYY-MM-DD');
  public tommorow = moment().add(1, 'day').format('YYYY-MM-DD');
  public fromResults$: BehaviorSubject<{[key: string]: any}[]> = new BehaviorSubject<{[key: string]: any}[]>([]);
  public toResults$: BehaviorSubject<{[key: string]: any}[]> = new BehaviorSubject<{[key: string]: any}[]>([]);
  private destroy$ = new Subject<void>();
  public results!: IResponse;

  onSetTransportType(transportType: string): void {
    this.form.patchValue({transport_types: transportType});
  }

  onDateChange(e: any) {
    this.form.patchValue({date: e.target.value.format('YYYY-MM-DD')});
  }

  dateFilter(d: Date | null): boolean {
    return  moment(d).format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD') &&
            moment(d).format('YYYY-MM-DD') !== moment().add(1, 'day').format('YYYY-MM-DD') &&
            moment(d) > moment().add(1, 'day');
  };

  setDate(date: any) {
    this.dateControl.setValue(date);
  }

  onSubmit(): void {
    const params = Object.assign(this.form.value, {
      from: this.fromControl.value.code,
      to: this.toControl.value.code
    });
    this.transportsScheduleService.getTransportsSchedule(params).subscribe(res => {
      this.results = res;
    });
  }

  ngOnInit(): void {
    this.fromControl.valueChanges
      .pipe(
        debounceTime(500),
        filter(val => typeof val === 'string'),
        takeUntil(this.destroy$)
      )
      .subscribe(val => {
        console.log(val)
        if (!val) {
          this.fromResults$.next([]);
        } else {
          this.transportsScheduleService.getStations(val as string).subscribe(res => {
            this.fromResults$.next(res);
          });
        }
      });
    this.toControl.valueChanges
      .pipe(
        debounceTime(500),
        filter(val => typeof val === 'string'),
        takeUntil(this.destroy$)
      )
      .subscribe(val => {
        if (!val) {
          this.toResults$.next([]);
        } else {
          this.transportsScheduleService.getStations(val as string).subscribe(res => {
            this.toResults$.next(res);
          });
        }
      });
  }

  displayFn(option?: {name: string, code: string}): any {
    return option?.name;
  }

  switchFromTo(): void {
    const temp = this.fromControl.value;
    this.fromControl.setValue(this.toControl.value);
    this.toControl.setValue(temp);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  get fromControl(): FormControl {
    return this.form.get('from') as FormControl;
  }

  get toControl(): FormControl {
    return this.form.get('to') as FormControl;
  }

  get dateControl(): FormControl {
    return this.form.get('date') as FormControl;
  }

  get transportTypeControl(): FormControl {
    return this.form.get('transport_types') as FormControl;
  }
}

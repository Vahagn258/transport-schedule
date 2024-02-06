import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { IResponse, ISegment } from '../../interfaces/interfaces';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-transport-schedule-results',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgxPaginationModule
  ],
  templateUrl: './transport-schedule-results.component.html',
  styleUrl: './transport-schedule-results.component.scss'
})
export class TransportScheduleResultsComponent implements OnChanges {

  @Input() results!: IResponse;
  segments: ISegment[] = [];
  transportTitles: any = {
    bus: 'Автобус',
    train: 'Поезд',
    plane: 'Самолет',
    suburban: 'Электричка'
  };
  months = [
    'янв.',
    'фев.',
    'март',
    'апр.',
    'май',
    'июнь',
    'июль',
    'авг.',
    'сен.',
    'окт.',
    'ноя.',
    'дек.',
  ];
  p: number = 1;

  ngOnChanges(): void {
    if (this.results) {
      this.segments = this.results.segments;
      this.segments.forEach((segment: ISegment) => {
        const fromDate = new Date(segment.departure);
        const endDate = new Date(segment.arrival);
        segment['startDate'] = `${fromDate.getDate()} ${this.months[fromDate.getMonth()]}`;
        segment['endDate'] = `${endDate.getDate()} ${this.months[endDate.getMonth()]}`;
        segment['startTime'] = `${fromDate.getHours()}:${fromDate.getMinutes()}`;
        segment['endTime'] = `${new Date(fromDate.getTime() + 1000 * segment.duration).getHours()}:${new Date(fromDate.getTime() + 1000 * segment.duration).getMinutes()}`;
        segment['durationTime'] = this.formatDuration(segment.duration);
      });
    }
    console.log(this.results)
  }

  formatDuration(seconds: number) {
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return minutes + " минут";
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return hours + " час" + (hours === 1 ? "" : "а");
    } else {
      const days = Math.floor(seconds / 86400);
      return days === 1 ? `${days} день` : `${days} дня`;
    }
}

}

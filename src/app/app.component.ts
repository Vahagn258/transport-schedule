import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransportScheduleComponent } from './components/transport-schedule/transport-schedule.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TransportScheduleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'transport-schedule';
}

import { Component, NgZone, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-auto-logout',
  templateUrl: './auto-logout.component.html',
  styleUrls: ['./auto-logout.component.css'],
})
export class AutoLogoutComponent implements OnInit {
  message = 'pending';
  notify$ = new Subject();

  addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }

  // code: [[Angular] NgZone 的應用 | CK's Notepad](https://blog.kevinyang.net/2019/02/14/ng-ngzone/)
  constructor(private zone: NgZone) {
    /* localStorage 紀錄最後一次使用者動作的時間 */
    localStorage.setItem(
      'expiredDate',
      this.addMinutes(new Date(), 0.1).getTime().toString()
    );

    this.zone.runOutsideAngular(() => {
      const interval = setInterval(() => {
        const expiredDate = +localStorage.getItem('expiredDate');
        /* inside runOutsideAngular, outside ng change detection scheme*/
        console.log(new Date().getTime() - expiredDate);

        /* if it expire..
        1. we clean timer
        2. use zone.run to resume ng change detection to notify change */
        if (new Date().getTime() - expiredDate > 0) {
          this.zone.run(() => {
            this.notify$.next();
          });
          clearInterval(interval);
        }
      }, 1000);
    });
  }

  ngOnInit(): void {
    this.notify$.subscribe(() => {
      console.log('timeout');
      this.message = 'timeout';
    });
  }
}

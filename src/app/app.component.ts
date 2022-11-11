import { Component, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Five-score';
    scoreTeam1 = 0;
    scoreTeam2 = 0;
    @ViewChild('myDialog') dialog: ElementRef<any> | undefined;
    now = new BehaviorSubject(new Date());
    time: string = '';
    second: string = '';
    interval: any = null

    constructor() {
        this.interval = setInterval(() => {
            this.now.next(new Date())
        }, 1000)
    }

    ngOnInit(): void {
        this.now.subscribe((date) => {
            this.time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            this.second = date.toLocaleTimeString([], { second: '2-digit' })
        })
    }

    displaySeconds() {
        return +this.second < 10 ? `0${this.second}` : this.second
    }

    incrScoreTeam1() {
        this.scoreTeam1++;
    }

    incrScoreTeam2() {
        this.scoreTeam2++;
    }

    decrScoreTeam1() {
        if (this.scoreTeam1 > 0) {
            this.scoreTeam1--;
        }
    }

    decrScoreTeam2() {
        if (this.scoreTeam2 > 0) {
            this.scoreTeam2--;
        }
    }

    openDialog() {
        if (this.dialog) {
            this.dialog?.nativeElement.show()
        }
    }

    close() {
        this.dialog?.nativeElement.close()
    }

    resetScore() {
        this.scoreTeam1 = 0;
        this.scoreTeam2 = 0;
        this.dialog?.nativeElement.close()
    }
}

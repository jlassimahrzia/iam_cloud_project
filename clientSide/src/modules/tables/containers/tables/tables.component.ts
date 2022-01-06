import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './tables.component.html',
    styleUrls: ['tables.component.scss'],
})
export class TablesComponent implements OnInit {
    title = '';

    constructor() {}
    ngOnInit() {

      let connectedUser =  JSON.parse(localStorage.getItem('user'));
        console.log(connectedUser);

      this.title = "👋 Welcome, " + connectedUser.firstname + " " + connectedUser.lastname;

    }

}

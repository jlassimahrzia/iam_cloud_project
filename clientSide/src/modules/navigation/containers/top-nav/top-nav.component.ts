import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '@modules/auth/services';
import { NavigationService } from '@modules/navigation/services';

@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    constructor(private navigationService: NavigationService, private userService: UserService) { }
    fullname: string;
    ngOnInit() {
       // get user from local storage
         let userLocalData = this.userService.getUserFromBrowser();
         this.fullname = userLocalData.user.firstname + ' ' + userLocalData.user.lastname

    }
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }
}

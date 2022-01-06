import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '@modules/auth/services';
import {Router} from "@angular/router";

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(public userService: UserService, public router: Router) {}
    ngOnInit() {}

    logout() {
        this.userService.logout().subscribe(()=>{
            this.router.navigate(['auth/login']);
        });
    }
}

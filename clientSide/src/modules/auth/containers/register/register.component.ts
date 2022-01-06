import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
import { Router } from '@angular/router';
import { RoleService } from '@modules/auth/services/roles.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
    //public user: User;
    lastname: string = '';
    firstname: string = '';
    password: string = '';
    email: string = '';
    hasError: any = false;

    constructor(
        public userService: UserService,
        public router: Router,
        public roleService: RoleService,
        private toast: HotToastService
    ) {}

    ngOnInit() {}

    register() {
        if (this.password && this.email && this.firstname && this.lastname) {
            this.hasError = false;
            let loadingToast = this.toast.loading('Connecting...', {
                position: 'top-right',
            });
            this.roleService
                .createUser(this.firstname, this.lastname, this.email, this.password)
                .subscribe(
                    (res: any) => {
                        loadingToast.close();
                        this.toast.success('You have been successfully signing up!', {
                            position: 'top-right',
                        });
                        this.router.navigate(['/auth/login']);
                    },
                    error => {
                        loadingToast.close();
                        this.toast.error('Something went wrong', {
                            position: 'top-right',
                        });
                        console.log(error);
                    }
                );
        } else {
            this.hasError = true;
        }
    }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    password: string = '';
    email: string = '';
    hasError: any = false;
    roles: Role[] = [];

    constructor(
        public userService: UserService,
        public router: Router,
        private toast: HotToastService
    ) {
    }

    ngOnInit() {
    }

    login() {

        console.log('login');
        if (this.password && this.email && this.password.length > 0 && this.email.length > 0) {
            this.hasError = false;
            let loadingToast = this.toast.loading("Connecting...", {
                position: 'top-right',
            })
            this.userService.login(this.password, this.email).subscribe(() => {
                this.userService.getUser().subscribe((res: any) => {
                    loadingToast.close();
                    this.toast.success("Connected! Welcome " + res.body.user.firstname, {
                        position: 'top-right',
                    })

                    let user = res;
                    let user_role = user.body.role[0];


                    this.userService.setUserInBrowser(user.body)
                    if (user) {
                        this.router.navigate(['/admin/users']);


                        if (user_role === 'ROLE_ADMIN') {
                            this.router.navigate(['/auth/roles']); // if user is admin, redirect to roles page
                        }
                        else {
                            this.router.navigate(['/admin/users']); // redirect to normal user page
                        }

                    }
                })
            }, error => {
                loadingToast.close();
                this.toast.error("Wrong credentials, please check your email and password", {
                    position: 'top-right'
                })
                console.log(error)
            });
        } else {
            this.hasError = true;

        }
    }
}

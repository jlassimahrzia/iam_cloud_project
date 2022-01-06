import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupComponent } from '@modules/auth/containers/popup/popup.component';
import { Permission, Role, User } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
import { RoleService } from '@modules/auth/services/roles.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'sb-users', templateUrl: './users.component.html', styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {
    password: string = '';
    email: string = '';
    hasError: any = false;
    users: User[] = [];
    isLoading: boolean = true;

    constructor(
        public userService: UserService,
        public roleService: RoleService,
        public ngbModal: NgbModal,
        public router: Router) {
    }
    ngOnInit() {
        this.getUsers();
    }
    getUsers() {
        this.roleService.getUsers().subscribe(value => {
            this.isLoading = false;
            console.log(value);
            if (value && value.body) {
                this.users = value.body
            }
        })
    }

    handleUser(id: number) {
        const modalRef = this.ngbModal.open(PopupComponent)
        modalRef.componentInstance.type = "user";
        modalRef.componentInstance.userId = id;
        modalRef.componentInstance.created.subscribe(() => {
            console.log();
            modalRef.dismiss();
            this.getUsers();
        })
    }

    showUser(id: number) {
        const modalRef = this.ngbModal.open(PopupComponent)
        modalRef.componentInstance.type = "user_view";
        modalRef.componentInstance.userId = id;
        modalRef.componentInstance.created.subscribe(() => {
            console.log();
            modalRef.dismiss();
            this.getUsers();
        })
    }

    newUser() {
        const modalRef = this.ngbModal.open(PopupComponent)
        modalRef.componentInstance.type = "user_create";
        modalRef.componentInstance.created.subscribe(() => {
            console.log();
            modalRef.dismiss();
            this.getUsers();
        })
    }
}

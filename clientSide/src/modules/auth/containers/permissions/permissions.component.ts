import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PopupComponent} from '@modules/auth/containers/popup/popup.component';
import {Permission, Role} from '@modules/auth/models';
import {UserService} from '@modules/auth/services';
import {RoleService} from '@modules/auth/services/roles.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'sb-permissions', templateUrl: './permissions.component.html', styleUrls: ['permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
    password: string = '';
    email: string = '';
    hasError: any = false;
    permissions: Permission[] = [];
    isLoading = true;
    constructor(
        public userService: UserService,
        public roleService: RoleService,
        public ngbModal: NgbModal,
        public router: Router) {
    }
    ngOnInit() {
        this.getPermissions();
    }
    getPermissions() {

        this.roleService.getPermissions().subscribe(value => {
            this.isLoading = false;
            console.log(value);
            if (value && value.body) {
                this.permissions = value.body
            }
        })
    }

    newPermissions() {
        const modalRef = this.ngbModal.open(PopupComponent, { size: 'lg'})
        modalRef.componentInstance.type="per"
        modalRef.componentInstance.created.subscribe(() => {
            console.log();
            modalRef.dismiss();
            this.getPermissions();
        })
    }
}

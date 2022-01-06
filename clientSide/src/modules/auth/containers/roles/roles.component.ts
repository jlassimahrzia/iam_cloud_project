import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupComponent } from '@modules/auth/containers/popup/popup.component';
import { Role } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
import { RoleService } from '@modules/auth/services/roles.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
    selector: 'sb-roles', templateUrl: './roles.component.html', styleUrls: ['roles.component.scss'],
})
export class RolesComponent implements OnInit {
    password: string = '';
    email: string = '';
    hasError: any = false;
    roles: Role[] = [];
    isLoading = true;

    constructor(
        public userService: UserService,
        public roleService: RoleService,
        public router: Router,
        public ngbModal: NgbModal,
        private toast: HotToastService

    ) {
    }

    ngOnInit() {
        this.getRoles();
    }



    getRoles() {
        this.roleService.getRoles().subscribe(value => {
            this.isLoading = false;
            console.log(value);
            if (value && value.body) {
                this.roles = value.body
            }
        })
    }

    deleteRole(id: number) {

        if (confirm('Are you sure you want to delete this role?')) {


            this.roleService.deleteRole(id).subscribe(value => {
                this.isLoading = false;
                if (value && value.body && value.body.msg) {
                    this.toast.success('Role deleted successfully', {
                        position: 'top-right',
                    });
                    this.getRoles();
                }
            })

        } else {



        }





    }
    newRole() {
        const modalRef = this.ngbModal.open(PopupComponent, { size: 'lg'})
        modalRef.componentInstance.type = "role"
        modalRef.componentInstance.created.subscribe(() => {
            this.isLoading = false;
            console.log();
            modalRef.dismiss();

            this.getRoles();
        })
    }
    editRole(id: number) {

    }
}
